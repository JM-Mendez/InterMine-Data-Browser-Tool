import React, { useEffect, useState } from 'react'
import { interpret } from 'xstate'

import {
	ADD_ORGANISM_CONSTRAINT,
	RECEIVE_SUMMARY,
	REMOVE_ORGANISM_CONSTRAINT,
} from '../../actionConstants'
import { organismSummary } from '../../stubs/geneSummaries'
import { popupDecorator } from '../../utils/storybook'
import { ConstraintPopup } from '../Constraints/ConstraintBase'
import { organismMachine, OrganismPopup } from '../Constraints/Organism'

export default {
	title: 'Components/Popup Cards/Constraints/Organism',
	decorators: [...popupDecorator],
}

export const ConstraintNotSet = () => (
	<div css={{ maxWidth: 500, minWidth: 376 }}>
		<ConstraintPopup>
			<OrganismPopup allUnchecked={true} organisms={organismSummary.results} />
		</ConstraintPopup>
	</div>
)

export const ConstraintSet = () => (
	<div css={{ maxWidth: 500, minWidth: 376 }}>
		<ConstraintPopup constraintSet={true}>
			<OrganismPopup allChecked={true} organisms={organismSummary.results} />
		</ConstraintPopup>
	</div>
)

const service = interpret(organismMachine)

// use a normal function, otherwise storybook enters recursion hell
export function Playground() {
	const [state, setState] = useState(undefined)

	useEffect(() => {
		service.onTransition(setState)
		service.start()
		// @ts-ignore
		service.send({ type: RECEIVE_SUMMARY, summary: organismSummary })
	}, [])

	const constraintChangeHandler = (constraint) => (e) => {
		if (e.target.checked) {
			// @ts-ignore
			service.send({ type: ADD_ORGANISM_CONSTRAINT, constraint })
		} else {
			// @ts-ignore
			service.send({ type: REMOVE_ORGANISM_CONSTRAINT, constraint })
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
				constraintSet={state?.context.selectedOrganisms.length > 0}
			>
				<OrganismPopup
					organisms={state?.context.availableOrganisms}
					constraintChangeHandler={constraintChangeHandler}
				/>
			</ConstraintPopup>
		</div>
	)
}
