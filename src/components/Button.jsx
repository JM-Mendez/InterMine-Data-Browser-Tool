import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import React from 'react'
import { Button as RKButton } from 'reakit/Button'

import { getFontSize } from '../theme'
import { colors } from '../theme/colorPalette'
import { Icon } from './Icon'

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
	color: ${(props) => props.fontColor};
	background-color: ${(props) => getIntentColor(props.intent)};
	border-radius: 0.25em;
	padding: 0.5em 0.667em;
	cursor: pointer;
	font-size: ${(props) => getFontSize(props.fontSize)};
	line-height: 1;
	outline: none;

	&:focus {
		box-shadow: 0 0 0 0.2em rgba(0, 109, 255, 0.6);
	}

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

export const Button = ({ icon, iconRight, iconColor, iconRightColor, children, ...props }) => {
	return (
		// using the `as` prop here as a hack because our css-in-js library passes props through
		// to the underlying DOM node by mistake.
		<StyledButton as="button" {...props}>
			{icon && <Icon name={icon} iconColor={iconColor} />}
			{children}
			{iconRight && <Icon name={iconRight} iconColor={iconRightColor} />}
		</StyledButton>
	)
}

Button.propTypes = {
	intent: PropTypes.oneOf(['primary', 'info', 'danger']),
	fontSize: PropTypes.oneOf(['s1', 's2', 'm1', 'm2', 'm3', 'l1', 'l2', 'l3']),
	/**
	 * Font color
	 */
	fontColor: PropTypes.string,
	/**
	 * Icon name that will be places on the **left side** of the button
	 */
	icon: PropTypes.string,
	/**
	 * Icon color for the **left side** icon
	 */
	iconColor: PropTypes.string,
	/**
	 * Icon name that will be places on the **right side** of the button
	 */
	iconRight: PropTypes.string,
	/**
	 * Icon color for the **right side** icon
	 */
	iconRightColor: PropTypes.string,
}

Button.defaultProps = {
	intent: 'primary',
	fontSize: 's2',
	fontColor: 'black',
}
