import { Navbar } from '@blueprintjs/core'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import React, { useState } from 'react'

import { ApiStatus } from './ApiStatus'
import { ClassSelector } from './ClassSelector'
import { Mine } from './MineSelect'
import { ThemeControl } from './ThemeControl'

const StyledNav = styled(Navbar)`
	padding-left: 40px;
`

export const NavigationBar = () => {
	const [mockMines] = useState([
		{ name: 'Human Mine' },
		{ name: 'Fly Mine' },
		{ name: 'Hymenoptera Mine' },
	])
	const [mine, setMine] = useState(mockMines[0])

	return (
		<StyledNav>
			<Navbar.Group
				className={css`
					width: 100%;
				`}
			>
				<Mine mine={mine} setMine={setMine} mockMines={mockMines} />
				<ApiStatus />
				<ClassSelector />
				<ThemeControl />
			</Navbar.Group>
		</StyledNav>
	)
}
