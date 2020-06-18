import { Button, Icon, Popover } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import React from 'react'

import { useTheme, withTheme } from '../../theme'

const CountTagWrapper = withTheme(
	styled.div`
		display: flex;
		align-self: flex-start;
		margin-left: 5px;
		font-size: ${({ theme }) => theme.fontSizes.desktop.s1};
		font-weight: ${({ theme }) => theme.fontWeights.medium};
		line-height: ${({ theme }) => theme.fontLineHeights.condensedUltra};
		border: 2px solid ${({ theme }) => theme.colors.greenPalette.green500};
		border-radius: 10px;
		height: 1.333em;

		& > div {
			margin: 0 0.833em;
		}
	`
)

const StyledIcon = styled(Icon)`
	/* We need to override Blueprint styling to create our pill */
	margin: -0.167em -0.167em !important;
	align-self: flex-start;
`

const ConstraintLabelWrapper = styled.div`
	display: flex;
	align-items: center;
`

const ConstraintIcon = withTheme(
	styled.div`
		border-radius: 30px;
		border: ${(props) => `0.167em solid ${props.labelBorderColor}`};
		font-size: ${({ theme }) => theme.fontSizes.desktop.s1};
		font-weight: ${({ theme }) => theme.fontWeights.medium};
		height: 2.5em;
		line-height: ${({ theme }) => theme.fontLineHeights.condensedUltra};
		margin-right: 0.625em;
		width: 2.5em;
		display: flex;
		align-items: center;
		justify-content: center;
	`
)

export const Constraint = ({
	constraintName,
	labelBorderColor,
	constraintCount,
	ariaLabel,
	labelText,
}) => {
	const theme = useTheme()

	return (
		<Button
			minimal={true}
			large={true}
			fill={true}
			alignText="left"
			aria-label={ariaLabel ? ariaLabel : constraintName}
		>
			<ConstraintLabelWrapper>
				<ConstraintIcon labelBorderColor={labelBorderColor}>
					<span>{labelText}</span>
				</ConstraintIcon>
				{constraintName}
				{constraintCount > 0 && (
					<CountTagWrapper>
						{constraintCount > 1 && <div>{constraintCount}</div>}
						<StyledIcon icon={IconNames.TICK_CIRCLE} color={theme.colors.greenPalette.green500} />
					</CountTagWrapper>
				)}
			</ConstraintLabelWrapper>
		</Button>
	)
}

export const ConstraintBase = ({ children, ...constraintProps }) => (
	<Popover fill={true} usePortal={true} lazy={true} position="right">
		<Constraint {...constraintProps} />
		{children}
	</Popover>
)

ConstraintBase.propTypes = {
	/**
	 * Name of the constraint
	 */
	constraintName: PropTypes.string,
	/**
	 * Text for the label icon
	 */
	labelText: PropTypes.string,
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
	popoverContent: PropTypes.node,
}

ConstraintBase.defaultProps = {
	constraintName: 'Name',
	labelText: 'Na',
	labelBorderColor: 'black',
	constraintCount: 0,
}
