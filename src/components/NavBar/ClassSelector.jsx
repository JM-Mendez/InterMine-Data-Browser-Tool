import { Button, Classes, Tab, Tabs } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import { css } from 'linaria'
import React from 'react'

import { NumberedSelectMenuItems } from '../Selects'

let visibleClasses = [{ name: 'Gene' }, { name: 'Protein' }]
let hiddenClasses = [{ name: 'Enhancer' }, { name: 'Chromosomal Duplication' }, { name: 'GWAS' }]
export const ClassSelector = ({ classes }) => {
	const handleClassSelect = (newClass) => {
		visibleClasses = [...visibleClasses, newClass]
		hiddenClasses = hiddenClasses.filter((c) => c.name !== newClass.name)
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
				<Tab
					key={visibleClasses[0].name}
					style={{ fontSize: 24, fontWeight: 300 }}
					id={visibleClasses[0].name}
					title={visibleClasses[0].name}
				/>
				<Tab
					key={visibleClasses[1].name}
					style={{ fontSize: 24, fontWeight: 300 }}
					id={visibleClasses[1].name}
					title={visibleClasses[1].name}
				/>
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
