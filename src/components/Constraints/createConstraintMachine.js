import { assign } from '@xstate/immer'
import { sendToBus } from 'src/machineBus'
import { Machine } from 'xstate'

import {
	APPLY_CONSTRAINT_TO_QUERY,
	LOCK_ALL_CONSTRAINTS,
	RESET_ALL_CONSTRAINTS,
} from '../../globalActions'
import {
	ADD_CONSTRAINT,
	APPLY_CONSTRAINT,
	REMOVE_CONSTRAINT,
	RESET_LOCAL_CONSTRAINT,
} from './actions'

/** @type {import('../../types').CreateConstraintMachine} */
export const createConstraintMachine = ({ id, initial = 'noConstraintsSet', path = '', op }) => {
	/** @type {import('../../types').ConstraintMachineConfig} */
	const config = {
		id,
		initial,
		context: {
			selectedValues: [],
			availableValues: [],
		},
		on: {
			[LOCK_ALL_CONSTRAINTS]: 'constraintLimitReached',
			[RESET_ALL_CONSTRAINTS]: { target: 'noConstraintsSet', actions: 'removeAll' },
			[RESET_LOCAL_CONSTRAINT]: { target: 'noConstraintsSet', actions: 'removeAll' },
		},
		states: {
			noConstraintsSet: {
				on: {
					[ADD_CONSTRAINT]: {
						target: 'constraintsUpdated',
						actions: 'addConstraint',
					},
				},
			},
			constraintsUpdated: {
				always: [{ target: 'noConstraintsSet', cond: 'constraintListIsEmpty' }],
				on: {
					[ADD_CONSTRAINT]: { actions: 'addConstraint' },
					[REMOVE_CONSTRAINT]: { actions: 'removeConstraint' },
					[APPLY_CONSTRAINT]: { target: 'constraintsApplied', actions: 'applyConstraint' },
				},
			},
			constraintsApplied: {
				on: {
					[ADD_CONSTRAINT]: {
						target: 'constraintsUpdated',
						actions: 'addConstraint',
					},
					[REMOVE_CONSTRAINT]: {
						target: 'constraintsUpdated',
						actions: 'removeConstraint',
					},
				},
			},
			constraintLimitReached: {
				on: {
					[REMOVE_CONSTRAINT]: { actions: 'removeConstraint' },
				},
			},
		},
	}

	return Machine(config, {
		actions: {
			// @ts-ignore
			addConstraint: assign((ctx, { constraint }) => {
				ctx.selectedValues.push(constraint)
			}),
			// @ts-ignore
			removeConstraint: assign((ctx, { constraint }) => {
				ctx.selectedValues = ctx.selectedValues.filter((name) => name !== constraint)
			}),
			removeAll: assign((ctx) => {
				ctx.selectedValues = []
			}),
			setAvailableValues: assign((ctx, event) => {
				// @ts-ignore
				ctx.availableValues = event.values
			}),
			applyConstraint: (ctx) => {
				const query = {
					path,
					op,
					values: ctx.selectedValues,
				}

				sendToBus({ query, to: '*', type: APPLY_CONSTRAINT_TO_QUERY })
			},
		},
		guards: {
			constraintListIsEmpty: (ctx) => {
				return ctx.selectedValues.length === 0
			},
		},
	})
}
