import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import React from 'react'
import { Button as RKButton } from 'reakit/Button'

import { getFontSize } from '../theme'
import { colors } from '../theme/colorPalette'

const PRIMARY = 'primary'
const PRIMARY_ACTIVE = 'primary-active'

const INFO = 'info'
const INFO_ACTIVE = 'info-active'

const DANGER = 'danger'
const DANGER_ACTIVE = 'danger-active'

const getIntentColor = (intent) => {
	switch (intent) {
		case PRIMARY:
			return colors.greenPalette.green600
		case PRIMARY_ACTIVE:
			return colors.greenPalette.green700
		case INFO:
			return colors.orangePalette.orange600
		case INFO_ACTIVE:
			return colors.orangePalette.orange700
		case DANGER:
			return colors.redPalette.red600
		case DANGER_ACTIVE:
			return colors.redPalette.red700
		default:
			return colors.solidPalette.solidWhite
	}
}

const StyledButton = styled(RKButton)`
	border: 1px solid rgba(27, 31, 35, 0.2);
	background-image: linear-gradient(360deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1));
	color: ${colors.bluePalette.blue000};
	background-color: ${(props) => getIntentColor(props.intent)};
	border-radius: 0.25em;
	padding: 0.5em 0.667em;
	cursor: pointer;
	font-size: ${(props) => getFontSize(props.fontSize)};
	line-height: 1;

	&:not([disabled]),
	&:not([aria-disabled='true']) {
		&:hover,
		&:focus {
			background-image: linear-gradient(360deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05));
		}
		&:active,
		&[data-active='true'] {
			background-color: ${(props) => getIntentColor(`${props.intent}-active`)};
		}
	}
`

// Workaround so storybook can show props table
export const Button = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>
Button.propTypes = {
	intent: PropTypes.oneOf(['primary', 'success', 'danger']),
	fontSize: PropTypes.oneOf(['s1', 's2', 'm1', 'm2', 'm3', 'l1', 'l2', 'l3']),
}

Button.defaultProps = {
	intent: 'primary',
	fontSize: 's2',
}
