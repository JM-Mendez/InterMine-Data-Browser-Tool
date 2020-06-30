import {
	Button,
	Classes,
	Colors,
	H4,
	H5,
	NonIdealState,
	Popover,
	PopoverInteractionKind,
} from '@blueprintjs/core'
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
`

const CurrentConstraints = ({ currentConstraints }) => {
	if (currentConstraints.length === 0) {
		return (
			<NonIdealState
				title="No Constraints applied"
				description="Displaying default results for the current mine"
				icon={IconNames.WARNING_SIGN}
				className={css`
					padding-bottom: 32px;
					border-radius: 3px;
					& .${Classes.NON_IDEAL_STATE_VISUAL} {
						color: var(--yellow5);
					}
				`}
			/>
		)
	}

	return (
		<div
			className={css`
				padding: 32px;
			`}
		>
			<div>constriants</div>
		</div>
	)
}

CurrentConstraints.propTypes = {
	currentConstraints: PropTypes.array,
}

CurrentConstraints.defaultProps = {
	currentConstraints: [
		'Gene.organism.shortName = M. musculus',
		'Gene.organism.shortName = M. musculus',
		'Gene.organism.shortName = M. musculus',
	],
}

const ViewAll = ({ currentConstraints = [] }) => {
	return (
		<Popover
			fill={true}
			usePortal={true}
			lazy={true}
			position="right"
			popoverClassName={Classes.POPOVER_CONTENT_SIZING}
			interactionKind={PopoverInteractionKind.CLICK}
			isOpen={true}
		>
			<Button text="view all" intent="primary" fill={true} icon={IconNames.EYE_OPEN} />
			<S_PopupContainer>
				<CloseButton />
				<H4>Current</H4>
				<CurrentConstraints />
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
