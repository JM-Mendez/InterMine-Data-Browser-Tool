import { Button, Divider, FormGroup, H4 } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Suggest } from '@blueprintjs/select'
import React from 'react'

import { useServiceContext } from '../../machineBus'
import { PlainSelectMenuItems } from '../Selects'
import { ADD_CONSTRAINT } from './actions'
import { NoValuesProvided } from './NoValuesProvided'

export const SelectPopup = ({
	nonIdealTitle = undefined,
	nonIdealDescription = undefined,
	label,
	uniqueId,
}) => {
	const [state, send] = useServiceContext()

	const { availableValues, selectedValues } = state?.context

	if (availableValues.length === 0) {
		return <NoValuesProvided title={nonIdealTitle} description={nonIdealDescription} />
	}

	// Blueprintjs requires a value renderer, but we add the value directly the added
	// constraints list when clicked
	const renderInputValue = (value) => ''

	const handleItemSelect = ({ item: constraint }) => {
		send({ type: ADD_CONSTRAINT, constraint })
	}

	return (
		<div>
			{selectedValues.length > 0 && (
				<>
					<H4 css={{ paddingTop: 8, marginBottom: 4 }}>
						{`${selectedValues.length > 1 ? 'Constraints' : 'Constraint'} Added`}
					</H4>
					<ul css={{ padding: '0 16px', listStyle: 'none', marginTop: 0 }}>
						{selectedValues.map((constraint) => {
							return (
								<li
									key={constraint}
									css={{
										display: 'flex',
										alignItems: 'center',
										padding: '6px 0',
									}}
								>
									<Button
										intent="danger"
										icon={IconNames.REMOVE}
										small={true}
										minimal={true}
										// onClick={() => sendMsg({ type: DELETE_QUERY_CONSTRAINT, constraint })}
										// aria-label={`reset constraint ${constraint.replace(/\./g, ' ')}`}
										css={{ marginRight: 4 }}
									/>
									<span css={{ fontSize: 'var(--fs-desktopM1)', display: 'inline-block' }}>
										{constraint}
									</span>
								</li>
							)
						})}
					</ul>
					<Divider />
				</>
			)}
			<FormGroup labelFor={uniqueId} label={label} css={{ paddingTop: 24 }}>
				<Suggest
					// @ts-ignore
					id={`selectPopup-${uniqueId}`}
					items={availableValues.map((i) => ({ name: `${i.item} (${i.count})`, item: i.item }))}
					itemRenderer={PlainSelectMenuItems}
					inputValueRenderer={renderInputValue}
					fill={true}
					onItemSelect={handleItemSelect}
				/>
			</FormGroup>
		</div>
	)
}
