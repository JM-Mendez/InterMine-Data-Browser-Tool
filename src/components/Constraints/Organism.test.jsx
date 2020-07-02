import { interpret } from 'xstate'

import { ADD_ORGANISM_CONSTRAINT, REMOVE_ORGANISM_CONSTRAINT } from '../../actionConstants'
import { organismConstraintQuery } from './constraintQueries'
import { organismMachine } from './Organism'

describe('Organism machine', () => {
	it('adds an organism to the selected list', () => {
		const machine = organismMachine.withContext({ selectedOrganisms: [] })
		const service = interpret(machine).start()
		// let state = machine.initialState

		// service.onTransition((s) => {
		// 	state = s
		// })

		const constraint = organismConstraintQuery('aaa')
		service.send({
			type: ADD_ORGANISM_CONSTRAINT,
			// @ts-ignore
			constraint,
		})

		const nextConstraint = organismConstraintQuery('bbb')
		service.send({
			type: ADD_ORGANISM_CONSTRAINT,
			// @ts-ignore
			constraint: nextConstraint,
		})

		service.onTransition((state) => {
			const selectedOrganisms = state.context.selectedOrganisms
			expect(state.value).toBe('constraintsUpdated')
			expect(selectedOrganisms).toHaveLength(2)

			expect(selectedOrganisms[0]).toBe(constraint)
			expect(selectedOrganisms[1]).toBe(nextConstraint)
		})
	})
})
