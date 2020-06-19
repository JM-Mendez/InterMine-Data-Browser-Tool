import { Button, Colors, H5, Popover } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import React from 'react'

import { withTheme } from '../theme'

const StyledQueryController = styled.div`
	padding-top: 10px;
	margin: 0 20px;
`

const ViewAll = () => (
	<Popover fill={true} usePortal={true} lazy={true} position="right">
		<Button text="view all" intent="primary" fill={true} icon={IconNames.EYE_OPEN} />
		<div style={{ height: 100 }}>Hey ma, Look! A popup!</div>
	</Popover>
)

const RunQuery = () => (
	<Popover
		className={css`
			margin-top: 40px;
		`}
		wrapperTagName="div"
		usePortal={true}
		lazy={true}
		position="right"
	>
		<Button text="Run Query" intent="success" rightIcon={IconNames.PLAY} />
		<div style={{ height: 100 }}>Hey ma, Look! A popup!</div>
	</Popover>
)

const StyledHeading = withTheme(styled.span`
	color: ${({ theme }) => theme.colors.bluePalette.blue900};
`)

export const QueryController = () => {
	return (
		<StyledQueryController>
			<H5>
				<span
					className={css`
						color: ${Colors.BLUE5};
					`}
				>
					4{' '}
				</span>
				<StyledHeading>Constraints applied</StyledHeading>
			</H5>
			<ViewAll />
			<RunQuery />
		</StyledQueryController>
	)
}
