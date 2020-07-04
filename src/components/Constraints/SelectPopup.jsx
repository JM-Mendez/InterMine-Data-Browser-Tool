import { Button, Divider, FormGroup, H4 } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Suggest } from '@blueprintjs/select'
import Fuse from 'fuse.js'
import React, { useMemo, useState } from 'react'

import { useServiceContext } from '../../machineBus'
import { PlainSelectMenuItems } from '../Selects'
import { ADD_CONSTRAINT, REMOVE_CONSTRAINT } from './actions'
import { NoValuesProvided } from './NoValuesProvided'

export const SelectPopup = ({
	nonIdealTitle = undefined,
	nonIdealDescription = undefined,
	label,
	uniqueId,
}) => {
	const [state, send] = useServiceContext()
	const { availableValues, selectedValues } = state?.context

	const [matchedItems, setMatchedItems] = useState(availableValues)

	const fuse = useMemo(() => {
		return new Fuse(availableValues, {
			keys: ['item'],
		})
	}, [availableValues])

	if (availableValues.length === 0) {
		return <NoValuesProvided title={nonIdealTitle} description={nonIdealDescription} />
	}

	const unselectedItems = matchedItems.flatMap((v) => {
		const constraint = v.item?.item ?? v.item
		const count = v.item?.count ?? v.count

		return selectedValues.includes(v.item)
			? []
			: [{ name: `${constraint} (${count})`, item: v.item }]
	})

	// Blueprintjs requires a value renderer, but we add the value directly the added
	// constraints list when clicked
	const renderInputValue = (value) => ''

	const handleItemSelect = ({ item }) => {
		const constraint = item?.constraint ?? item
		send({ type: ADD_CONSTRAINT, constraint })
	}

	const handleButtonClick = (constraint) => () => {
		send({ type: REMOVE_CONSTRAINT, constraint })
	}

	const handleQueryChange = (query, e) => {
		if (query === '') {
			setMatchedItems(availableValues)
		} else {
			setMatchedItems(fuse.search(query))
		}
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
										// We handle
										onClick={handleButtonClick(constraint?.item ?? constraint)}
										aria-label={`delete ${constraint}`}
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
					items={unselectedItems}
					itemRenderer={PlainSelectMenuItems}
					inputValueRenderer={renderInputValue}
					fill={true}
					onItemSelect={handleItemSelect}
					onQueryChange={handleQueryChange}
				/>
			</FormGroup>
		</div>
	)
}
