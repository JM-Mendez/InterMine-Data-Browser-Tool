import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import PropTypes from 'prop-types'
import React from 'react'

export const SmallButton = ({ ariaLabel, text, minWidth }) => (
	<Button
		aria-label={ariaLabel}
		// used to override `Blueprintjs` styles for a small button
		style={{ minWidth }}
		small={true}
		text={text}
		alignText="left"
		rightIcon={IconNames.CARET_DOWN}
	/>
)

SmallButton.propTypes = {
	ariaLabel: PropTypes.string,
	text: PropTypes.string,
	/**
	 * Width used to override `Blueprintjs` styles on small buttons.
	 */
	minWidth: PropTypes.string,
}

SmallButton.defaultProps = {
	minWidth: '100%',
}
