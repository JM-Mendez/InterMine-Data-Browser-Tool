import { Button } from '@blueprintjs/core'
import { css } from 'linaria'
import PropTypes from 'prop-types'
import React from 'react'
import s from 'underscore.string'

import { fontLineHeights, fontSizes, fontWeights } from '../theme'

export const Constraint = ({ constraintName, labelBorderColor }) => {
	const label = s(constraintName)
		.humanize()
		.tap((val) => {
			const words = val.split(' ')
			if (words.length === 1) {
				return `${val.charAt(0).toUpperCase()}${val.charAt(1).toLowerCase()}`
			} else {
				return `${words[0].charAt(0).toUpperCase()}${words[1].charAt(0).toUpperCase()}`
			}
		})
		.value()

	return (
		<Button minimal={true} large={true}>
			<div className={textLabelWrapper}>
				<div className={constraintIcon} style={{ '--labelBorderColor': labelBorderColor }}>
					<span>{label}</span>
				</div>
				{constraintName}
			</div>
		</Button>
	)
}

const textLabelWrapper = css`
	display: flex;
	align-items: center;
`

const constraintIcon = css`
	border-radius: 30px;
	border: 0.167em solid var(--labelBorderColor);
	font-size: ${fontSizes.desktop.s1};
	font-weight: ${fontWeights.medium};
	height: 2.5em;
	line-height: ${fontLineHeights.condensed};
	margin-right: 0.833em;
	padding: 0.417em 0;
	width: 2.5em;
	text-align: center;
`

Constraint.propTypes = {
	/**
	 * Name of the constraint
	 */
	constraintName: PropTypes.string,
	/**
	 * Label icon border color
	 */
	labelBorderColor: PropTypes.string,
}

Constraint.defaultProps = {
	constraintName: 'ClinVar',
	labelBorderColor: 'black',
}
