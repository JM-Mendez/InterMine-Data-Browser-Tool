import { FormGroup } from '@blueprintjs/core'
import { Suggest } from '@blueprintjs/select'
import React from 'react'

import { useServiceContext } from '../../machineBus'
import { PlainSelectMenuItems } from '../Selects'
import { NoValuesProvided } from './NoValuesProvided'

export const SelectPopup = ({
	nonIdealTitle = undefined,
	nonIdealDescription = undefined,
	label,
	uniqueId,
}) => {
	const [state, send] = useServiceContext()

	const { availableValues } = state?.context

	if (availableValues.length === 0) {
		return <NoValuesProvided title={nonIdealTitle} description={nonIdealDescription} />
	}

	return (
		<div>
			<FormGroup labelFor={uniqueId} label={label} css={{ paddingTop: 24 }}>
				<Suggest
					// @ts-ignore
					id={`selectPopup-${uniqueId}`}
					items={availableValues.map((i) => ({ name: `${i.item} (${i.count})` }))}
					itemRenderer={PlainSelectMenuItems}
					fill={true}
				/>
			</FormGroup>
		</div>
	)
}
