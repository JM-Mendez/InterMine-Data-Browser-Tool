import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import { css } from 'linaria'
import React from 'react'

import { NumberedSelectMenuItems } from '../Selects'
import { StyledNavHeading } from './StyledNavHeading'

export const Mine = ({ mine, mockMines, setMine }) => {
	return (
		<>
			<StyledNavHeading>Mine</StyledNavHeading>
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
					aria-label="select the mine you'd like to query"
					// used to override `Blueprintjs` styles for a small button
					style={{ minWidth: 166 }}
					small={true}
					text={mine.name}
					alignText="left"
					rightIcon={IconNames.CARET_DOWN}
				/>
			</Select>
		</>
	)
}
