import { Checkbox, Colors, Label, NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { assign } from '@xstate/immer'
import PropTypes from 'prop-types'
import React from 'react'
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
import { organismSummary } from '../../stubs/geneSummaries'
import { ConstraintBase } from './ConstraintBase'

export const OrganismPopup = ({
	allChecked = false,
	allUnchecked = false,
	constraintChangeHandler = (_value) => (_e) => {},
	organisms = [],
}) => {
	let forceChecked = null
	if (allChecked) forceChecked = true
	if (allUnchecked) forceChecked = false

	if (organisms.length === 0) {
		return (
			<NonIdealState
				title="No organisms found"
				description="If you feel this is a mistake, try refreshing the browser. If that doesn't work, let us know"
				icon={IconNames.WARNING_SIGN}
			/>
		)
	}

	return (
		<div>
			<Label className="sr-only">Select organisms to set constraints</Label>
			{organisms.map((value) => (
				<Checkbox
					label={`${value.item} (${value.count})`}
					checked={forceChecked}
					onChange={constraintChangeHandler(value)}
				/>
			))}
		</div>
	)
}

OrganismPopup.propTypes = {
	checkAll: PropTypes.bool,
	disableAll: PropTypes.bool,
}

export const Organism = () => (
	<ConstraintBase
		constraintName="Organism"
		labelText="Or"
		labelBorderColor={Colors.ROSE4}
		constraintCount={0}
		constraintSet={false}
		isOpen={null}
	/>
)

export const organismMachine = Machine(
	{
		id: 'Organism',
		initial: 'init',
		context: {
			selectedOrganisms: [],
			availableOrganisms: [],
		},
		on: {
			[LOCK_CONSTRAINTS]: 'constraintLimitReached',
			[REMOVE_ALL_CONSTRAINTS]: { target: 'noConstraintsSet', actions: 'removeAll' },
			[REMOVE_ALL_ORGANISM_CONSTRAINTS]: { target: 'noConstraintsSet', actions: 'removeAll' },
		},
		always: [{ target: 'noConstraintsSet', cond: 'constraintListIsEmpty' }],
		states: {
			init: {
				entry: 'fetchOrganisms',
				on: {
					[RECEIVE_SUMMARY]: {
						target: 'noConstraintsSet',
						actions: 'setAvailableOrganisms',
					},
				},
			},
			noConstraintsSet: {
				on: {
					[ADD_ORGANISM_CONSTRAINT]: {
						target: 'constraintsUpdated',
						actions: 'addConstraint',
					},
				},
			},
			constraintsUpdated: {
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
				ctx.selectedOrganisms = ctx.selectedOrganisms.filter((cs) => cs.value === constraint.value)
			}),
			removeAll: assign((ctx) => {
				ctx.selectedOrganisms = []
			}),
			fetchOrganisms: assign((ctx) => {
				ctx.availableOrganisms = organismSummary.results
			}),
		},
		guards: {
			constraintListIsEmpty: (ctx) => {
				return ctx.selectedOrganisms.length === 0
			},
		},
	}
)
