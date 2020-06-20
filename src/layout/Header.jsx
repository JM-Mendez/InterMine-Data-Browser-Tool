import { css } from 'linaria'
import React from 'react'

import { NavigationBar } from '../components/NavBar/NavBar'
import logo from '../images/logo.png'

const header = css`
	display: inline-flex;
	width: 100%;
`

const logoContainer = css`
	min-width: 230px;
	height: 43px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-right: 2px solid var(--blue5);
	border-bottom: 2px solid var(--blue5);
`

export const Header = () => {
	return (
		<>
			<header className={header}>
				<div className={logoContainer}>
					<img width="120px" src={logo} alt="Logo" />
				</div>
				<NavigationBar />
			</header>
		</>
	)
}
