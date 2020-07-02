import { Button, ButtonGroup, Icon, Tag } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'

import { PopupCard } from '../Shared/PopupCard'

const S_CountTag = styled.div`
	display: flex;
	align-self: flex-start;
	margin-left: 5px;
	font-size: var(--fs-desktopS1);
	font-weight: var(--fw-medium);
	line-height: 1;
	border: 2px solid var(--green5);
	border-radius: 10px;
	height: 1.333em;

	& > small {
		margin: 0 0.833em;
	}
`

const S_ConstraintIcon = styled.div`
	border-radius: 30px;
	border: ${(props) => `0.167em solid ${props.labelBorderColor}`};
	font-size: var(--fs-desktopS1);
	font-weight: var(--fw-medium);
	height: 2.5em;
	line-height: 1;
	margin-right: 0.625em;
	width: 2.5em;
	display: flex;
	align-items: center;
	justify-content: center;
`

/**
 * A constraint is styled as a button that takes the full width of its container. Each
 * constraint manages its own internal state with a state machine, and syncs back to the
 * history component using the event bus.
 *
 * ***NB***: The constraint stories are **not** styled to match their container's width, to
 * allow viewing their respective popups.
 */
export const Constraint = ({
	constraintName,
	labelBorderColor,
	constraintCount,
	ariaLabel,
	labelText,
}) => {
	return (
		<Button
			minimal={true}
			large={true}
			fill={true}
			alignText="left"
			aria-label={ariaLabel ? ariaLabel : constraintName}
		>
			<div css={{ display: 'flex', alignItems: 'center' }}>
				<S_ConstraintIcon labelBorderColor={labelBorderColor}>
					<span>{labelText}</span>
				</S_ConstraintIcon>
				{constraintName}
				{constraintCount > 0 && (
					<S_CountTag>
						{constraintCount > 1 && <small>{constraintCount}</small>}
						<Icon
							css={{ margin: '-0.167em -0.167em !important', alignSelf: 'flex-start' }}
							icon={IconNames.TICK_CIRCLE}
							color="var(--green5)"
						/>
					</S_CountTag>
				)}
			</div>
		</Button>
	)
}

export const ConstraintPopup = ({
	constraintSet = false,
	addEnabled = false,
	removeEnabled = false,
	children,
}) => {
	const borderColor = constraintSet ? 'var(--blue4)' : 'var(--grey4)'
	const iconColor = constraintSet ? 'var(--green5)' : 'var(--grey4)'
	const textColor = constraintSet ? 'var(--blue9)' : 'var(--grey4)'
	return (
		<>
			<div css={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
				<Tag
					css={{
						backgroundColor: 'unset',
						border: `1px solid ${borderColor}`,
						color: iconColor,
					}}
					// @ts-ignore
					intent="" // HACK - decreases blueprintjs css specificity
					icon={constraintSet ? IconNames.TICK_CIRCLE : IconNames.DISABLE}
					minimal={true}
				>
					<span
						// @ts-ignore
						css={{ color: textColor, fontWeight: 'var(--fw-medium)' }}
					>
						Constraint Set
					</span>
				</Tag>
			</div>
			{children}
			<ButtonGroup fill={true} css={{ marginTop: 48 }}>
				<Button
					text="Remove Constraint"
					css={{ maxWidth: '50%' }}
					intent={!removeEnabled ? 'none' : 'danger'}
					disabled={!removeEnabled}
				/>
				<Button
					text="Add Constraint"
					css={{ maxWidth: '50%' }}
					intent={!addEnabled ? 'none' : 'success'}
					disabled={!addEnabled}
				/>
			</ButtonGroup>
		</>
	)
}

ConstraintPopup.propTypes = {
	/**
	 * Whether the contrainst is set
	 */
	constraintSet: PropTypes.bool,
}

export const ConstraintBase = ({ children = null, isOpen, constraintSet, ...constraintProps }) => {
	return (
		<PopupCard boundary="viewport" isOpen={isOpen}>
			<Constraint {...constraintProps} />
			<div>
				<ConstraintPopup constraintSet={constraintSet}>{children}</ConstraintPopup>
			</div>
		</PopupCard>
	)
}

const propTypes = {
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
	/**
	 * Whether to force the popup into a controlled state.
	 * Null will handle the popup, while `true` and `false`
	 * make it a controlled component
	 */
	isOpen: PropTypes.oneOf([null, true, false]),
	/**
	 * Whether the constraints have been applied
	 */
	constaintSet: PropTypes.bool,
}

const defaultProps = {
	labelBorderColor: 'black',
	constraintCount: 0,
	isOpen: null,
	constraintSet: false,
}

Constraint.propTypes = propTypes
Constraint.defaultProps = defaultProps

ConstraintBase.propTypes = propTypes
ConstraintBase.defaultProps = defaultProps
