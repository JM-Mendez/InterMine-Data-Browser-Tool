import { Button, Classes, Colors, H5, Popover, PopoverInteractionKind } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React from 'react'

import { CloseButton } from './Shared/Buttons'

const S_QueryController = styled.div`
	padding-top: 10px;
	margin: 0 20px;
`

const S_Heading = styled.span`
	color: var(--blue9);
`

const S_PopupContainer = styled.div`
	min-width: 200px;
	height: 455px;
`

const ViewAll = () => {
	return (
		<Popover
			fill={true}
			usePortal={true}
			lazy={true}
			position="right"
			popoverClassName={Classes.POPOVER_CONTENT_SIZING}
			interactionKind={PopoverInteractionKind.CLICK}
		>
			<Button text="view all" intent="primary" fill={true} icon={IconNames.EYE_OPEN} />
			<S_PopupContainer>
				<CloseButton />
			</S_PopupContainer>
		</Popover>
	)
}

const RunQuery = () => (
	<Popover
		css={{ marginTop: 40 }}
		wrapperTagName="div"
		usePortal={true}
		lazy={true}
		position="right"
	>
		<Button text="Run Query" intent="success" rightIcon={IconNames.PLAY} />
		<div style={{ height: 100 }}>Hey ma, Look! A popup!</div>
	</Popover>
)

export const QueryController = () => {
	return (
		<div css={{ paddingTop: 10, margin: '0 20px' }}>
			<H5>
				<span css={{ color: 'var(--red6' }}>4 </span>
				<span css={{ color: 'var(--yellow8)' }}>Constraints applied</span>
			</H5>
			<ViewAll />
			<RunQuery />
		</div>
	)
}
