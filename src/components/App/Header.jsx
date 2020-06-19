import { Colors } from '@blueprintjs/core'
import { styled } from 'linaria/react'
import React from 'react'

import logo from '../../images/logo.png'
import { withTheme } from '../../theme'
import { NavigationBar } from '../NavBar/NavBar'

const StyledHeader = styled.header`
	display: inline-flex;
	width: 100%;
`

const StyledLogoContainer = withTheme(
	styled.div`
		min-width: 230px;
		height: 3.643em;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: ${({ theme }) => theme.colors.bluePalette.blue000};
		border-right: ${`2px solid ${Colors.COBALT1}`};
		border-bottom: ${`2px solid ${Colors.COBALT1}`};
	`
)

export const Header = () => {
	return (
		<>
			<StyledHeader>
				<StyledLogoContainer>
					<img width="120px" src={logo} alt="Logo" />
				</StyledLogoContainer>
				<NavigationBar />
			</StyledHeader>
		</>
	)
}
