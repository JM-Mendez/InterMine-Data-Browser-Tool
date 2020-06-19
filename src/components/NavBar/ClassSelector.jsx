import { Button, Classes, Tab, Tabs } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import { css } from 'linaria'
import React, { useState } from 'react'

import { NumberedSelectMenuItems } from '../Selects'

export const ClassSelector = () => {
	const [visibleClasses, setVisibleClasses] = useState([{ name: 'Gene' }, { name: 'Protein' }])
	const [hiddenClasses, setHiddenClasses] = useState([
		{ name: 'Enhancer' },
		{ name: 'Chromosomal Duplication' },
		{ name: 'GWAS' },
	])

	const handleClassSelect = (newClass) => {
		setVisibleClasses([...visibleClasses, newClass])
		setHiddenClasses(hiddenClasses.filter((c) => c.name !== newClass.name))
	}

	return (
		<>
			<Tabs
				className={css`
					margin-left: auto;
					& .${Classes.TAB_INDICATOR} {
						bottom: -0.357em;
					}
				`}
				id="Classes-tab"
				large={true}
			>
				{visibleClasses.map((c) => (
					<Tab key={c.name} style={{ fontSize: 24, fontWeight: 300 }} id={c.name} title={c.name} />
				))}
			</Tabs>
			<Select
				className={css`
					margin-left: 20px;
				`}
				items={hiddenClasses}
				filterable={true}
				itemRenderer={NumberedSelectMenuItems}
				onItemSelect={handleClassSelect}
			>
				<Button
					aria-label="select the views you'd like to query"
					// used to override `Blueprintjs` styles for a small button
					small={true}
					text="add view"
					alignText="left"
					rightIcon={IconNames.CARET_DOWN}
				/>
			</Select>
		</>
	)
}
