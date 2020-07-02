import { Checkbox, Colors, Label } from '@blueprintjs/core'
import { assign } from '@xstate/immer'
import PropTypes from 'prop-types'
import React from 'react'
import { Machine } from 'xstate'

import { ADD_ORGANISM_CONSTRAINT, REMOVE_ORGANISM_CONSTRAINT } from '../../actionConstants'
import { ConstraintBase } from './ConstraintBase'

const organisms = [
	'M. musculus (77154)',
	'H. sapiens (55862)',
	'R. norvegicus (44986)',
	'D. rerio (18527)',
	'D. melanogaster (8425)',
	'C. elegans (8085)',
	'S. cerevisiae (3296)',
]

export const OrganismPopup = ({
	allChecked = false,
	allUnchecked = false,
	constraintChangeHandler = (_value) => (_e) => {},
}) => {
	let forceChecked = null
	if (allChecked) forceChecked = true
	if (allUnchecked) forceChecked = false

	return (
		<div>
			<Label className="sr-only">Select organisms to set constraints</Label>
			{organisms.map((value) => (
				<Checkbox label={value} checked={forceChecked} onChange={constraintChangeHandler(value)} />
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
		initial: 'inactive',
		context: {
			selectedOrganisms: [],
		},
		states: {
			inactive: {
				on: {
					[ADD_ORGANISM_CONSTRAINT]: {
						target: 'constraintsUpdated',
						actions: 'addConstraint',
					},
				},
			},
			constraintsUpdated: {
				on: {
					[ADD_ORGANISM_CONSTRAINT]: {
						actions: 'addConstraint',
					},
					[REMOVE_ORGANISM_CONSTRAINT]: {
						actions: 'removeConstraint',
					},
				},
			},
		},
	},
	{
		actions: {
			addConstraint: assign((ctx, event) => {
				// @ts-ignore
				ctx.selectedOrganisms.push(event.constraint)
			}),
			removeConstraint: assign((ctx, event) => {
				// @ts-ignore
				ctx.selectedOrganisms.push(event.constraint)
			}),
		},
	}
)
