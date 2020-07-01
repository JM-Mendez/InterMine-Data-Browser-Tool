import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { interpret } from 'xstate'

import { ADD_CONSTRAINT, DELETE_CONSTRAINT } from '../../actionConstants'
import { useMachineBus } from '../../machineBus'
import { QueryController } from './QueryController'
import { queryControllerMachine } from './queryControllerMachine'
jest.mock('../../machineBus')

jest.mock(
	'popper.js',
	() =>
		class Popper {
			static placements = [
				'auto',
				'auto-end',
				'auto-start',
				'bottom',
				'bottom-end',
				'bottom-start',
				'left',
				'left-end',
				'left-start',
				'right',
				'right-end',
				'right-start',
				'top',
				'top-end',
				'top-start',
			]

			constructor() {
				return {
					destroy: () => {},
					scheduleUpdate: () => {},
				}
			}
		}
)

describe('QueryController Machine', () => {
	it.each(['a', 'b', 'c'].map((c, idx) => [c, idx]))(
		'deletes a constraint from the current list - index %#',
		(constraint) => {
			const machine = queryControllerMachine.withContext({
				currentConstraints: ['a', 'b', 'c'],
			})

			expect(machine.context.currentConstraints).toHaveLength(3)

			const nextMachine = machine.transition(machine.initialState, {
				// @ts-ignore
				type: DELETE_CONSTRAINT,
				constraint,
			})

			expect(nextMachine.context.currentConstraints).toHaveLength(2)
			expect(nextMachine.context.currentConstraints).toEqual(
				expect.not.arrayContaining([constraint])
			)
		}
	)

	it('adds a constraint to the current list', () => {
		const machine = queryControllerMachine.withContext({ currentConstraints: [] })

		expect(machine.context.currentConstraints).toHaveLength(0)

		const newConstraint = 'newly add constraint'
		const nextMachine = machine.transition(machine.initialState, {
			// @ts-ignore
			type: ADD_CONSTRAINT,
			constraint: newConstraint,
		})

		expect(nextMachine.context.currentConstraints).toHaveLength(1)
		expect(nextMachine.context.currentConstraints).toEqual(expect.arrayContaining([newConstraint]))
	})

	it('prevents adding more than 26 constraints', () => {
		const machine = queryControllerMachine.withContext({
			currentConstraints: Array.from('c'.repeat(25)),
		})

		const nextMachine = machine.transition(machine.initialState, {
			// @ts-ignore
			type: ADD_CONSTRAINT,
			contraint: 'DO NOT ADD',
		})

		expect(nextMachine.context.currentConstraints).toHaveLength(26)
		expect(nextMachine.value).toBe('constraintLimitReached')
	})
})

describe('QueryController UI', () => {
	it('adds displays newly added constraints to the QueryController UI', async () => {
		const machine = queryControllerMachine.withContext({ currentConstraints: [] })

		const service = interpret(machine).start()
		// @ts-ignore
		useMachineBus.mockReturnValue([machine.initialState, service.send])

		render(<QueryController />)

		// @ts-ignore
		service.send({ type: ADD_CONSTRAINT, constraint: 'a-constraint' })

		userEvent.click(screen.getByText('view all'))

		expect(screen.queryByText('a-constraint')).toBeInTheDocument()
	})

	it('does not display a new constraint when the max is reached', async () => {
		const machine = queryControllerMachine.withContext({
			currentConstraints: Array.from('a'.repeat(25)),
		})

		const service = interpret(machine).start()
		// @ts-ignore
		useMachineBus.mockReturnValue([machine.initialState, service.send])

		render(<QueryController />)

		// @ts-ignore
		service.send({ type: ADD_CONSTRAINT, constraint: 'final-constraint' })
		// @ts-ignore
		service.send({ type: ADD_CONSTRAINT, constraint: 'constraints-are-maxed' })

		userEvent.click(screen.getByText('view all'))

		expect(screen.queryByText('constraints-are-maxed')).not.toBeInTheDocument()
	})
})
