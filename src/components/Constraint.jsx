import { Button } from '@blueprintjs/core'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import React from 'react'
import s from 'underscore.string'

import { colors, fontLineHeights, fontSizes, fontWeights } from '../theme'

const constraintCount = css`
	width: 16px;
	height: 16px;
	background-color: ${colors.greenPalette.green500};
`
const LabelTextWrapper = styled.div`
	display: flex;
	align-items: center;
`

const ConstraintIcon = styled.div`
	border-radius: 30px;
	border: ${(props) => `0.167em solid ${props.labelBorderColor}`};
	font-size: ${fontSizes.desktop.s1};
	font-weight: ${fontWeights.medium};
	height: 2.5em;
	line-height: ${fontLineHeights.condensedUltra};
	margin-right: 0.833em;
	width: 2.5em;
	display: flex;
	align-items: center;
	justify-content: center;
`
export const Constraint = ({ constraintName, labelBorderColor, constraintCount }) => {
	const label = s(constraintName)
		.humanize()
		.tap((val) => {
			const words = val.split(' ')
			return words.length === 1
				? `${val.charAt(0).toUpperCase()}${val.charAt(1).toLowerCase()}`
				: `${words[0].charAt(0).toUpperCase()}${words[1].charAt(0).toUpperCase()}`
		})
		.value()

	return (
		<Button minimal={true} large={true}>
			<LabelTextWrapper>
				<ConstraintIcon labelBorderColor={labelBorderColor}>
					<span>{label}</span>
				</ConstraintIcon>
				{constraintName}
			</LabelTextWrapper>
		</Button>
	)
}

Constraint.propTypes = {
	/**
	 * Name of the constraint
	 */
	constraintName: PropTypes.string,
	/**
	 * Label icon border color
	 */
	labelBorderColor: PropTypes.string,
	/**
	 * The number of constraints applied
	 */
	constraintCount: PropTypes.number,
}

Constraint.defaultProps = {
	constraintName: 'ClinVar',
	labelBorderColor: 'black',
	constraintCount: 1,
}
