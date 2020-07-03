import { Checkbox, Label, NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { assign } from '@xstate/immer'
import PropTypes from 'prop-types'
import React from 'react'
import { Machine } from 'xstate'

import { LOCK_ALL_CONSTRAINTS, RECEIVE_SUMMARY, RESET_ALL_CONSTRAINTS } from '../../globalActions'
import { useServiceContext } from '../../machineBus2'
import {
	ADD_CONSTRAINT,
	APPLY_CONSTRAINT,
	REMOVE_CONSTRAINT,
	RESET_CONSTRAINT,
} from '../Constraints/actions'

export const CheckBoxPopup = ({ title = '', description = '' }) => {
	const [state, send] = useServiceContext()

	const { availableValues, selectedValues } = state?.context

	if (availableValues.length === 0) {
		return <NonIdealState title={title} description={description} icon={IconNames.WARNING_SIGN} />
	}

	const onChangeHandler = (constraint) => (e) => {
		if (e.target.checked) {
			// @ts-ignore
			send({ type: ADD_CONSTRAINT, constraint })
		} else {
			// @ts-ignore
			send({ type: REMOVE_CONSTRAINT, constraint })
		}
	}

	return (
		<div>
			<Label className="sr-only">Select organisms to set constraints</Label>
			{availableValues.map((value) => {
				return (
					<Checkbox
						key={value.item}
						label={`${value.item} (${value.count})`}
						checked={selectedValues.some((name) => name === value.item)}
						// @ts-ignore
						onChange={onChangeHandler(value.item)}
					/>
				)
			})}
		</div>
	)
}

CheckBoxPopup.propTypes = {
	checkAll: PropTypes.bool,
	disableAll: PropTypes.bool,
}

export const checkboxMachine = Machine(
	{
		id: 'CheckboxMachine',
		initial: 'noConstraintsSet',
		context: {
			selectedValues: [],
			availableValues: [],
		},
		on: {
			[LOCK_ALL_CONSTRAINTS]: 'constraintLimitReached',
			[RESET_ALL_CONSTRAINTS]: { target: 'noConstraintsSet', actions: 'removeAll' },
			[RESET_CONSTRAINT]: { target: 'noConstraintsSet', actions: 'removeAll' },
			[RECEIVE_SUMMARY]: { target: 'noConstraintsSet', actions: 'setAvailableValues' },
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
					[APPLY_CONSTRAINT]: 'constraintsApplied',
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
	},
	{
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
				ctx.availableValues = event.summary.results
			}),
		},
		guards: {
			constraintListIsEmpty: (ctx) => {
				return ctx.selectedValues.length === 0
			},
		},
	}
)
