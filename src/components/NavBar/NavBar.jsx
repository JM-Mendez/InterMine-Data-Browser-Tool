import {
	Button,
	Classes,
	Colors,
	Icon,
	MenuItem,
	Navbar,
	NavbarHeading,
	Tab,
	Tabs,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import React, { useState } from 'react'

import { withTheme } from '../../theme'
import { SmallButton } from '../SmallButton'

const StyledNav = styled(Navbar)`
	padding-left: 40px;
`

const MineRenderer = (mine, props) => {
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

const mockMines = [{ name: 'Human Mine' }, { name: 'Fly Mine' }, { name: 'Hymenoptera Mine' }]
const Mine = ({ mine, setMine }) => {
	return (
		<>
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
				<SmallButton
					minWidth={'166px'}
					ariaLabel="Select the mine you want to query"
					text={mine.name}
				/>
			</Select>
		</>
	)
}

const ApiStatus = () => {
	const [isAuthenticated, setAuthentication] = useState(false)
	return (
		<>
			<StyledNavHeading>Api Key</StyledNavHeading>
			<Button
				aria-label="Press button to enter your api key"
				small={true}
				icon={AuthenticatedIcon(isAuthenticated)}
				onClick={() => setAuthentication(!isAuthenticated)}
			/>
		</>
	)
}

const ClassSelector = () => {
	const [visibleClasses, updateVisibleClasses] = useState([{ name: 'Gene' }, { name: 'Protein' }])
	const [hiddenClasses, setHiddenClasses] = useState([
		{ name: 'Enhancer' },
		{ name: 'Chromosomal Duplication' },
		{ name: 'GWAS' },
	])

	const handleClassSelect = (newClass) => {
		updateVisibleClasses([...visibleClasses, newClass])
		setHiddenClasses(hiddenClasses.filter((c) => c.name !== newClass.name))
	}

	return (
		<>
			<Tabs
				className={css`
					margin-left: 15%;
					& .${Classes.TAB_INDICATOR} {
						bottom: -0.357em;
					}
				`}
				id="Classes-tab"
				large={true}
			>
				{visibleClasses.map((c) => (
					// use `style` prop to override `Blueprintjs` styling
					<Tab style={{ fontSize: 24, fontWeight: 300 }} id={c.name} title={c.name} />
				))}
			</Tabs>
			<Select
				className={css`
					margin-left: 20px;
				`}
				items={hiddenClasses}
				filterable={true}
				itemRenderer={MineRenderer}
				onItemSelect={handleClassSelect}
			>
				<SmallButton ariaLabel="select the views you'd like to query" text="add view"></SmallButton>
			</Select>
		</>
	)
}

export const NavigationBar = () => {
	const [mine, setMine] = useState(mockMines[0])

	return (
		<StyledNav>
			<Navbar.Group
				className={css`
					width: 100%;
				`}
			>
				<Mine mine={mine} setMine={setMine} />
				<ApiStatus />
				<ClassSelector />
			</Navbar.Group>
		</StyledNav>
	)
}
