import React, { useState } from 'react'

import { popupDecorator } from '../../utils/storybook'
import { ConstraintPopup } from '../Constraints/ConstraintBase'
import { OrganismPopup } from '../Constraints/Organism'

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

export const Playground = () => {
	const [constraintsChecked, updateConstraintsChecked] = useState([])
	const [constraintSet, toggleConstraintSet] = useState(false)

	const updateConstraints = (value) => ({ target: { checked } }) => {
		if (checked) {
			updateConstraintsChecked([...constraintsChecked, value])
		} else {
			updateConstraintsChecked(constraintsChecked.filter((v) => v !== value))
		}
	}

	return (
		<div css={{ maxWidth: 500, minWidth: 376 }}>
			<ConstraintPopup constraintSet={false}>
				<OrganismPopup constraintChangeHandler={updateConstraints} />
			</ConstraintPopup>
		</div>
	)
}
