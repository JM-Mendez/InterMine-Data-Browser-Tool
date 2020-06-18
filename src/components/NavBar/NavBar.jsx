import { Button, Colors, Icon, MenuItem, Navbar, NavbarHeading } from '@blueprintjs/core'
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
		font-weight: 300;
		color: ${({ theme }) => theme.colors.bluePalette.blue900};
	`
)

const AuthenticatedIcon = (isAuthenticated) => (
	<Icon
		icon={isAuthenticated ? IconNames.UNLOCK : IconNames.LOCK}
		color={isAuthenticated ? Colors.GREEN5 : Colors.RED3}
	/>
)

export const NavigationBar = () => {
	const [mine, setMine] = useState(mockMines[0])
	const [isAuthenticated, setAuthentication] = useState(false)

	return (
		<StyledNav>
			<Navbar.Group>
				<StyledNavHeading>Mine</StyledNavHeading>
				<Select
					className={css`
						margin-right: 30px;
					`}
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
				<StyledNavHeading>Api Key</StyledNavHeading>
				<Button
					aria-label="Press button to enter your api key"
					small={true}
					icon={AuthenticatedIcon(isAuthenticated)}
					onClick={() => setAuthentication(!isAuthenticated)}
				/>
			</Navbar.Group>
		</StyledNav>
	)
}
