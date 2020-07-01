import {
	Button,
	Classes,
	Divider,
	H4,
	H5,
	NonIdealState,
	Popover,
	PopoverInteractionKind,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { ClassNames } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import { CloseButton } from './Shared/Buttons'

const CurrentConstraints = ({ currentConstraints }) => {
	const [constraints, setConstraints] = useState(currentConstraints)

	useEffect(() => {
		if (currentConstraints !== constraints) {
			setConstraints(currentConstraints)
		}
	}, [currentConstraints, constraints])

	if (currentConstraints.length === 0) {
		return (
			<NonIdealState
				title="No Constraints applied"
				description="Displaying default results for the current mine"
				icon={IconNames.WARNING_SIGN}
				css={{
					paddingBottom: 32,
					borderRadius: 3,
					[`& .${Classes.NON_IDEAL_STATE_VISUAL}`]: {
						color: 'var(--yellow5)',
					},
				}}
			/>
		)
	}

	return (
		<ul css={{ padding: '16px 16px 0', listStyle: 'none' }}>
			{constraints.map((constraint) => {
				return (
					<li css={{ display: 'flex', alignItems: 'center', paddingBottom: 12 }}>
						<Button
							intent="danger"
							icon={IconNames.REMOVE}
							small={true}
							minimal={true}
							css={{ marginRight: 4 }}
						/>
						<span css={{ fontSize: 'var(--fs-desktopM1)', display: 'inline-block' }}>
							{constraint}
						</span>
					</li>
				)
			})}
		</ul>
	)
}

CurrentConstraints.propTypes = {
	currentConstraints: PropTypes.array,
}

CurrentConstraints.defaultProps = {
	currentConstraints: [
		'Gene.organism.shortName = M. musculus',
		'Gene.organism.shortName = H. sapiens',
		'Gene LOOKUP MGI:1918911',
	],
}

const ViewAll = ({ currentConstraints }) => {
	return (
		<ClassNames>
			{({ css }) => (
				<Popover
					fill={true}
					usePortal={true}
					lazy={true}
					position="right"
					popoverClassName={`${css({ maxWidth: 500 })} ${Classes.POPOVER_CONTENT_SIZING}`}
					interactionKind={PopoverInteractionKind.CLICK}
					isOpen={true}
				>
					<Button text="view all" intent="primary" fill={true} icon={IconNames.EYE_OPEN} />
					<div>
						<CloseButton />
						<H4>Current</H4>
						<CurrentConstraints currentConstraints={currentConstraints} />
						<Divider css={{ width: '75%', marginBottom: 16 }} />
						<H4>History</H4>
						<NonIdealState
							title="You have no historical queries"
							icon={IconNames.INFO_SIGN}
							css={{
								paddingBottom: 32,
								borderRadius: 3,
							}}
						/>
					</div>
				</Popover>
			)}
		</ClassNames>
	)
}

const RunQuery = () => {
	return (
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
}

export const QueryController = () => {
	return (
		<div css={{ paddingTop: 10, margin: '0 20px' }}>
			<H5>
				<span css={{ color: 'var(--green5)' }}>4 </span>
				<span css={{ color: 'var(--blue9)' }}>Constraints applied</span>
			</H5>
			<ViewAll currentConstraints={undefined} />
			<RunQuery />
		</div>
	)
}
