import { colors } from './colorPalette'
import { spacing } from './spacing'
import { darkTheme, lightTheme } from './theme'
import { fontLineHeights, fontSizes, fontWeights, getFontSize } from './typography'

export const useStyles = () => {
	const theme = {
		colors,
		spacing,
		darkTheme,
		lightTheme,
		fontLineHeights,
		fontSizes,
		fontWeights,
		getFontSize,
	}

	return [theme]
}
