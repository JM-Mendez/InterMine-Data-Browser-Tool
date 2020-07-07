import { Button, Classes, Divider, FormGroup, H4 } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Suggest } from '@blueprintjs/select'
import Fuse from 'fuse.js'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ADD_CONSTRAINT, REMOVE_CONSTRAINT } from 'src/actionConstants'
import { generateId } from 'src/generateId'

import { useServiceContext } from '../../machineBus'
import { PlainSelectMenuItems } from '../Selects'
import { NoValuesProvided } from './NoValuesProvided'

export const SelectPopup = ({
	nonIdealTitle = undefined,
	nonIdealDescription = undefined,
	label = '',
}) => {
	const [uniqueId] = useState(() => `selectPopup-${generateId()}`)
	const [state, send] = useServiceContext('constraints')
	const { availableValues, selectedValues } = state.context

	const fuse = useRef(new Fuse([]))

	useEffect(() => {
		const origValues = [...availableValues]

		fuse.current = new Fuse(origValues, {
			keys: ['item'],
		})
	}, [availableValues])

	if (availableValues.length === 0) {
		return <NoValuesProvided title={nonIdealTitle} description={nonIdealDescription} />
	}

	let unselectedItems = availableValues.map((i) => ({ name: i.item, count: i.count }))

	if (unselectedItems.length === 0) {
		unselectedItems = [{ name: 'No items match your search', item: '' }]
	}

	// Blueprintjs requires a value renderer, but we add the value directly to the
	// added constraints list when clicked
	const renderInputValue = () => ''

	const handleItemSelect = ({ name }) => {
		send({ type: ADD_CONSTRAINT, constraint: name })
	}

	const handleButtonClick = (constraint) => () => {
		send({ type: REMOVE_CONSTRAINT, constraint })
	}

	const filterQuery = (query, items) => {
		if (query === '') {
			return items
		}

		const fuseResults = fuse.current.search(query)
		return fuseResults.map((r) => ({ name: r.item.item, count: r.item.count }))
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
										onClick={handleButtonClick(constraint)}
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
					itemListPredicate={filterQuery}
					fill={true}
					onItemSelect={handleItemSelect}
					resetOnSelect={true}
				/>
			</FormGroup>
		</div>
	)
}
