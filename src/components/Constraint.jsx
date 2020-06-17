import { Button } from '@blueprintjs/core'
import { css } from 'linaria'
import PropTypes from 'prop-types'
import React from 'react'
import s from 'underscore.string'

import { Text } from './Text'

const textLabelWrapper = css`
	display: flex;
`

const labelStyles = css`
	margin-right: 10px;
	border: 2px solid black;
	border-radius: 30px;
	padding: 5px;
`

export const Constraint = ({ constraintName }) => {
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
				<div className={labelStyles}>
					<Text fontSize="s1" fontWeight="medium">
						{label}
					</Text>
				</div>
				{constraintName}
			</div>
		</Button>
	)
}

Constraint.propTypes = {
	/**
	 * Name of the constraint
	 */
	constraintName: PropTypes.string,
}

Constraint.defaultProps = {
	constraintName: 'ClinVar',
}
