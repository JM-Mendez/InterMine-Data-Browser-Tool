import React from 'react'

import { useMachineBus } from '../../machineBus'
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
			<OrganismPopup allUnchecked={true} />
		</ConstraintPopup>
	</div>
)

export const ConstraintSet = () => (
	<div css={{ maxWidth: 500, minWidth: 376 }}>
		<ConstraintPopup constraintSet={true}>
			<OrganismPopup allChecked={true} />
		</ConstraintPopup>
	</div>
)

// use a normal function, otherwise storybook enters recursion hell
export function Playground() {
	const [state, send] = useMachineBus(organismMachine)

	const { availableOrganisms } = state.context

	return (
		<div css={{ maxWidth: 500, minWidth: 376 }}>
			<ConstraintPopup constraintSet={false}>
				<OrganismPopup />
			</ConstraintPopup>
		</div>
	)
}
