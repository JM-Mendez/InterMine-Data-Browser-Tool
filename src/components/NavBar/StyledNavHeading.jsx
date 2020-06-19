import { NavbarHeading } from '@blueprintjs/core'
import { styled } from 'linaria/react'

import { withTheme } from '../../theme'

export const StyledNavHeading = withTheme(
	styled(NavbarHeading)`
		font-size: 24px;
		font-weight: 300;
		color: ${({ theme }) => theme.colors.bluePalette.blue900};
	`
)
