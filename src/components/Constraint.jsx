import { Button, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import React from 'react'
import s from 'underscore.string'

import { colors, fontLineHeights, fontSizes, fontWeights } from '../theme'

const Tag = () => (
	<Icon
		className={css`
			margin-left: 5px;
			align-self: flex-start;
		`}
		icon={IconNames.TICK_CIRCLE}
		color={colors.greenPalette.green500}
	/>
)

const CountTag = ({ count }) => {
	return <Tag />
}

const ConstraintLabelWrapper = styled.div`
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
	margin-right: 0.625em;
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
			<ConstraintLabelWrapper>
				<ConstraintIcon labelBorderColor={labelBorderColor}>
					<span>{label}</span>
				</ConstraintIcon>
				{constraintName}
				{constraintCount > 0 && <CountTag count={constraintCount} />}
			</ConstraintLabelWrapper>
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
	constraintName: 'Name',
	labelBorderColor: 'black',
	constraintCount: 1,
}
