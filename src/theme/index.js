import { createTheming } from '@callstack/react-theme-provider'

import { colors } from './colorPalette'
import { spacing } from './spacing'
import { fontLineHeights, fontSizes, fontWeights, getFontSize } from './typography'

const defaultTheme = {
	colors,
	spacing,
	fontLineHeights,
	fontSizes,
	fontWeights,
	getFontSize,
}

export const { ThemeProvider, withTheme, useTheme } = createTheming(defaultTheme)
