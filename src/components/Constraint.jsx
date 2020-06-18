import { Button, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import React from 'react'
import s from 'underscore.string'

import { useStyles } from '../theme'

const CountTagWrapper = styled.div`
	display: flex;
	align-self: flex-start;
	margin-left: 5px;
	font-size: ${({ theme }) => theme.fontSizes.desktop.s1};
	font-weight: ${({ theme }) => theme.fontWeights.bold};
	line-height: ${({ theme }) => theme.fontLineHeights.condensedUltra};
	border: 2px solid ${({ theme }) => theme.colors.greenPalette.green500};
	border-radius: 10px;
	height: 1.333em;

	& > div {
		margin: 0 0.833em;
	}
`

const StyledIcon = styled(Icon)`
	/* We need to override Blueprint styling to create our pill */
	margin: -0.167em -0.167em !important;
	align-self: flex-start;
`

const ConstraintLabelWrapper = styled.div`
	display: flex;
	align-items: center;
`

const ConstraintIcon = styled.div`
	border-radius: 30px;
	border: ${(props) => `0.167em solid ${props.labelBorderColor}`};
	font-size: ${({ theme }) => theme.fontSizes.desktop.s1};
	font-weight: ${({ theme }) => theme.fontLineHeights.condensedUltra};
	height: 2.5em;
	line-height: ${({ theme }) => theme.fontLineHeights.condensedUltra};
	margin-right: 0.625em;
	width: 2.5em;
	display: flex;
	align-items: center;
	justify-content: center;
`
export const Constraint = ({ constraintName, labelBorderColor, constraintCount, ariaLabel }) => {
	const [theme] = useStyles()

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
		<Button
			minimal={true}
			large={true}
			fill={true}
			alignText="left"
			aria-label={ariaLabel ? ariaLabel : constraintName}
		>
			<ConstraintLabelWrapper theme={theme}>
				<ConstraintIcon theme={theme} labelBorderColor={labelBorderColor}>
					<span>{label}</span>
				</ConstraintIcon>
				{constraintName}
				{constraintCount > 0 && (
					<CountTagWrapper theme={theme}>
						{constraintCount > 1 && <div>{constraintCount}</div>}
						<StyledIcon
							theme={theme}
							icon={IconNames.TICK_CIRCLE}
							color={theme.colors.greenPalette.green500}
						/>
					</CountTagWrapper>
				)}
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
	/**
	 * The text to be read by a screenreader
	 */
	ariaLabel: PropTypes.string,
}

Constraint.defaultProps = {
	constraintName: 'Name',
	labelBorderColor: 'black',
	constraintCount: 0,
}
