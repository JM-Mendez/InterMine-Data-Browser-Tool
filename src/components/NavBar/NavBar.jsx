import { Button, MenuItem, Navbar, NavbarHeading } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import React, { useState } from 'react'

import { withTheme } from '../../theme'

const StyledNav = styled(Navbar)`
	padding-left: 40px;
`

const mockMines = [{ name: 'Human Mine' }, { name: 'Fly Mine' }, { name: 'Hymenoptera Mine' }]

const MineRenderer = (mine, props) => {
	console.log(props)
	return (
		<MenuItem
			key={mine.name}
			text={`${props.index + 1}. ${mine.name}`}
			active={props.modifiers.active}
			onClick={props.handleClick}
		/>
	)
}

const StyledNavHeading = withTheme(
	styled(NavbarHeading)`
		font-size: 24px;
		color: ${({ theme }) => theme.colors.bluePalette.blue900};
	`
)

export const NavigationBar = () => {
	const [mine, setMine] = useState(mockMines[0])

	return (
		<StyledNav>
			<Navbar.Group>
				<StyledNavHeading>Mine</StyledNavHeading>
				<Select
					items={mockMines}
					filterable={false}
					itemRenderer={MineRenderer}
					onItemSelect={setMine}
				>
					<Button
						aria-label="Select the mine you want to query"
						// used to override `Blueprintjs` styles for a small button
						style={{ minWidth: '166px' }}
						small={true}
						text={mine.name}
						alignText="left"
						rightIcon={IconNames.CARET_DOWN}
					/>
				</Select>
			</Navbar.Group>
		</StyledNav>
	)
}
