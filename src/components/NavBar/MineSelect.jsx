import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import { css } from 'linaria'
import React from 'react'

import { NumberedSelectMenuItems } from '../Selects'

const label = css`
	font-size: var(--fs-desktopM2);
	font-weight: var(--fw-regular);
	margin-right: 8px;
	margin-bottom: 0;
`

const navSelectContainer = css`
	display: flex;
	align-items: center;
`

export const Mine = ({ mine, mockMines, setMine }) => {
	return (
		<div className={navSelectContainer}>
			<span className={label}>Mine</span>
			<Select
				className={css`
					margin-right: 30px;
				`}
				items={mockMines}
				filterable={false}
				itemRenderer={NumberedSelectMenuItems}
				onItemSelect={setMine}
			>
				<Button
					aria-label="Select Mine"
					// used to override `Blueprintjs` styles for a small button
					style={{ minWidth: 166 }}
					small={true}
					text={mine.name}
					alignText="left"
					rightIcon={IconNames.CARET_DOWN}
				/>
			</Select>
		</div>
	)
}
