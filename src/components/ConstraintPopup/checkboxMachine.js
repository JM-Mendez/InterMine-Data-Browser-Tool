import { assign } from '@xstate/immer'
import { Machine } from 'xstate'

import {
	ADD_ORGANISM_CONSTRAINT,
	APPLY_ORGANISM_CONSTRAINT,
	LOCK_CONSTRAINTS,
	RECEIVE_SUMMARY,
	REMOVE_ALL_CONSTRAINTS,
	REMOVE_ALL_ORGANISM_CONSTRAINTS,
	REMOVE_ORGANISM_CONSTRAINT,
} from '../../actionConstants'

export const checkboxMachineFactory = (id = 'ID not set') =>
	Machine(
		{
			id,
			initial: 'noConstraintsSet',
			context: {
				selectedOrganisms: [],
				availableOrganisms: [],
			},
			on: {
				[LOCK_CONSTRAINTS]: 'constraintLimitReached',
				[REMOVE_ALL_CONSTRAINTS]: { target: 'noConstraintsSet', actions: 'removeAll' },
				[REMOVE_ALL_ORGANISM_CONSTRAINTS]: { target: 'noConstraintsSet', actions: 'removeAll' },
				[RECEIVE_SUMMARY]: { target: 'noConstraintsSet', actions: 'setAvailableOrganisms' },
			},
			states: {
				noConstraintsSet: {
					on: {
						[ADD_ORGANISM_CONSTRAINT]: {
							target: 'constraintsUpdated',
							actions: 'addConstraint',
						},
					},
				},
				constraintsUpdated: {
					always: [{ target: 'noConstraintsSet', cond: 'constraintListIsEmpty' }],
					on: {
						[ADD_ORGANISM_CONSTRAINT]: { actions: 'addConstraint' },
						[REMOVE_ORGANISM_CONSTRAINT]: { actions: 'removeConstraint' },
						[APPLY_ORGANISM_CONSTRAINT]: 'constraintsApplied',
					},
				},
				constraintsApplied: {
					on: {
						[ADD_ORGANISM_CONSTRAINT]: {
							target: 'constraintsUpdated',
							actions: 'addConstraint',
						},
						[REMOVE_ORGANISM_CONSTRAINT]: {
							target: 'constraintsUpdated',
							actions: 'removeConstraint',
						},
					},
				},
				constraintLimitReached: {
					on: {
						[REMOVE_ORGANISM_CONSTRAINT]: { actions: 'removeConstraint' },
					},
				},
			},
		},
		{
			actions: {
				// @ts-ignore
				addConstraint: assign((ctx, { constraint }) => {
					ctx.selectedOrganisms.push(constraint)
				}),
				// @ts-ignore
				removeConstraint: assign((ctx, { constraint }) => {
					ctx.selectedOrganisms = ctx.selectedOrganisms.filter(
						(cs) => cs.value !== constraint.value
					)
				}),
				removeAll: assign((ctx) => {
					ctx.selectedOrganisms = []
				}),
				setAvailableOrganisms: assign((ctx, event) => {
					// @ts-ignore
					ctx.availableOrganisms = event.summary.results
				}),
			},
			guards: {
				constraintListIsEmpty: (ctx) => {
					return ctx.selectedOrganisms.length === 0
				},
			},
		}
	)
