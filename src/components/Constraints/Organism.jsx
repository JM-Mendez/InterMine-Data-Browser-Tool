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
import { ConstraintBase } from './ConstraintBase'
import { organismConstraintQuery } from './constraintQueries'

export const OrganismPopup = ({
	constraintChangeHandler = (_value) => (_e) => {},
	organisms = [],
	selectedOrganisms = [],
}) => {
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
					key={value.item}
					label={`${value.item} (${value.count})`}
					checked={selectedOrganisms.some((o) => o.value === value.item)}
					onChange={constraintChangeHandler(organismConstraintQuery(value.item))}
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
				ctx.selectedOrganisms = ctx.selectedOrganisms.filter((cs) => cs.value !== constraint.value)
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
