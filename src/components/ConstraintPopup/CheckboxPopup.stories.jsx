import { decorate } from '@storybook/addon-actions'
import React, { useEffect, useState } from 'react'
import { interpret } from 'xstate'

import {
	ADD_ORGANISM_CONSTRAINT,
	APPLY_ORGANISM_CONSTRAINT,
	RECEIVE_SUMMARY,
	REMOVE_ALL_ORGANISM_CONSTRAINTS,
	REMOVE_ORGANISM_CONSTRAINT,
} from '../../actionConstants'
import { useMachineBus } from '../../machineBus'
import { organismSummary } from '../../stubs/geneSummaries'
import { popupDecorator } from '../../utils/storybook'
import { ConstraintPopup } from '../Constraints/ConstraintBase'
import { organismMachine, OrganismPopup } from '../Constraints/Organism'

export default {
	title: 'Components/Popup Cards/CheckBox',
	decorators: [...popupDecorator],
}

export const ConstraintNotSet = () => (
	<div css={{ maxWidth: 500, minWidth: 376 }}>
		<ConstraintPopup>
			<OrganismPopup selectedOrganisms={[]} organisms={organismSummary.results} />
		</ConstraintPopup>
	</div>
)

export const ConstraintsChanged = () => (
	<div css={{ maxWidth: 500, minWidth: 376 }}>
		<ConstraintPopup addEnabled={true} constraintSet={false}>
			<OrganismPopup
				selectedOrganisms={organismSummary.results.map((i) => ({ value: i.item }))}
				organisms={organismSummary.results}
			/>
		</ConstraintPopup>
	</div>
)

export const ConstraintsApplied = () => (
	<div css={{ maxWidth: 500, minWidth: 376 }}>
		<ConstraintPopup removeEnabled={true} constraintSet={true}>
			<OrganismPopup
				selectedOrganisms={organismSummary.results.slice(0, 3).map((i) => ({ value: i.item }))}
				organisms={organismSummary.results}
			/>
		</ConstraintPopup>
	</div>
)

// const service = interpret(organismMachine)

const conArgs = decorate([(args) => args.map((a) => JSON.stringify(a))])

export const Playground = () => {
	// const [state, setState] = useState(undefined)
	const [state, send] = useMachineBus(organismMachine)

	useEffect(() => {
		// @ts-ignore
		send({ type: RECEIVE_SUMMARY, summary: organismSummary })
	}, [])

	const constraintChangeHandler = (constraint) => (e) => {
		if (e.target.checked) {
			// @ts-ignore
			send({ type: ADD_ORGANISM_CONSTRAINT, constraint })
			conArgs.action('ADD')(constraint)
		} else {
			// @ts-ignore
			send({ type: REMOVE_ORGANISM_CONSTRAINT, constraint })
			conArgs.action('REMOVE')(constraint)
		}
	}

	const handleSubmit = (type) => {
		if (type === 'REMOVE_CLICKED') {
			send(REMOVE_ALL_ORGANISM_CONSTRAINTS)
		} else {
			send(APPLY_ORGANISM_CONSTRAINT)
		}
	}

	const disableAll = state?.value === 'noConstraintsSet'
	const enableAdd = state?.value === 'constraintsUpdated'
	const enableRemoved = state?.value !== 'constraintsUpdated'

	return (
		<div css={{ maxWidth: 500, minWidth: 376 }}>
			<ConstraintPopup
				removeEnabled={!disableAll && enableRemoved}
				addEnabled={!disableAll && enableAdd}
				constraintSet={!disableAll && enableRemoved}
				handleSubmit={handleSubmit}
			>
				<OrganismPopup
					organisms={state?.context.availableOrganisms}
					selectedOrganisms={state?.context.selectedOrganisms}
					constraintChangeHandler={constraintChangeHandler}
				/>
			</ConstraintPopup>
		</div>
	)
}
