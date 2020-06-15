import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import { Button as RKButton } from 'reakit/Button'

import { colors } from '../theme/colorPalette'

const PRIMARY = 'primary'
const PRIMARY_HOVER = 'primary-hover'
const PRIMARY_ACTIVE = 'primary-active'

const SUCCESS = 'success'
// const SUCCESS_HOVER = 'success-hover'
// const SUCCESS_ACTIVE = 'success-active'

const DANGER = 'danger'
// const DANGER_HOVER = 'danger-hover'
// const DANGER_ACTIVE = 'danger-active'

const getIntentColor = (intent) => {
	switch (intent) {
		case SUCCESS:
			return colors.greenPalette.green600
		case DANGER:
			return colors.redPalette.red600
		case PRIMARY:
			return colors.orangePalette.orange400
		case PRIMARY_HOVER:
			return colors.orangePalette.orange500
		case PRIMARY_ACTIVE:
			return colors.orangePalette.orange600
		default:
			return colors.solidPalette.solidWhite
	}
}

export const Button = styled(RKButton)`
	border: 1px solid rgba(27, 31, 35, 0.2);
	background-image: linear-gradient(360deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1));
	color: ${colors.solidPalette.solidWhite};
	background-color: ${(props) => getIntentColor(props.intent)};
	border-radius: 3px;
	height: 28px;
	width: 100px;
	cursor: pointer;

	&:not([disabled]),
	&:not([aria-disabled='true']) {
		&:hover,
		&:focus {
			background-image: linear-gradient(360deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
		}
		&:active,
		&[data-active='true'] {
			background-color: ${(props) => getIntentColor(`${props.intent}-active`)};
		}
	}
`

Button.propTypes = {
	intent: PropTypes.oneOf(['primary', 'success', 'danger']),
}
