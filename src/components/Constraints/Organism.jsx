import { Colors, Tag } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useState } from 'react'

import { CloseButton } from '../Shared/Buttons'
import { PopupCard } from '../Shared/PopupCard'
import { ConstraintBase } from './ConstraintBase'

export const OrganismPopup = () => {
	const [constraintSet, toggleConstraintSet] = useState(false)
	const borderColor = constraintSet ? 'var(--blue4)' : 'var(--grey4)'
	const iconColor = constraintSet ? 'var(--green5)' : 'var(--grey4)'
	const textColor = constraintSet ? 'var(--blue9)' : 'var(--grey4)'

	return (
		<PopupCard>
			<CloseButton />
			<div css={{ display: 'flex', justifyContent: 'center' }}>
				<Tag
					css={{
						backgroundColor: 'unset',
						border: `1px solid ${borderColor}`,
						color: iconColor,
					}}
					// @ts-ignore
					intent="" // HACK - decreases blueprintjs css specificity
					icon={constraintSet ? IconNames.TICK_CIRCLE : IconNames.DISABLE}
					minimal={true}
				>
					<span
						// @ts-ignore
						css={{ color: textColor, fontWeight: 'var(--fw-medium)' }}
					>
						Constraint Set
					</span>
				</Tag>
			</div>
		</PopupCard>
	)
}

export const Organism = () => (
	<ConstraintBase
		constraintName="Organism"
		labelText="Or"
		labelBorderColor={Colors.ROSE4}
		constraintCount={0}
	>
		<OrganismPopup />
	</ConstraintBase>
)
