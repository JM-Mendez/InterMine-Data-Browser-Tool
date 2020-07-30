import { Button, Colors, Icon, InputGroup, Popover } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import React, { useEffect, useState } from 'react'
import { CHANGE_MINE, SET_API_TOKEN } from 'src/eventConstants'
import { useServiceContext } from 'src/useMachineBus'

import { NumberedSelectMenuItems } from '../Shared/Selects'

export const MineSelector = () => {
	const [state, send] = useServiceContext('appManager')
	const [showPopup, setShowPopup] = useState(false)

	const { selectedMine, intermines } = state.context
	const [apiToken, setApiToken] = useState(selectedMine.apiToken)
	const [currentMine, setCurrentMine] = useState(selectedMine.rootUrl)

	useEffect(() => {
		if (currentMine !== selectedMine.rootUrl) {
			setCurrentMine(selectedMine.rootUrl)
			setApiToken(selectedMine.apiToken)
		}
	}, [currentMine, selectedMine.rootUrl, selectedMine.apiToken])

	const handleMineChange = ({ name }) => {
		send({ type: CHANGE_MINE, newMine: name })
	}

	const isAuthenticated = selectedMine.apiToken.length > 0

	return (
		<>
			{/* 
					mine selection
		  */}
			<div css={{ display: 'flex', alignItems: 'center' }}>
				<span
					// @ts-ignore
					css={{
						fontSize: 'var(--fs-desktopM2)',
						fontWeight: 'var(--fw-regular)',
						marginRight: 8,
						marginBottom: 0,
					}}
				>
					Mine
				</span>
				<Select
					css={{ marginRight: 30 }}
					items={intermines}
					filterable={false}
					itemRenderer={NumberedSelectMenuItems}
					onItemSelect={handleMineChange}
				>
					<Button
						aria-label="Select Mine"
						// used to override `Blueprintjs` styles for a small button
						style={{ minWidth: 166 }}
						small={true}
						text={selectedMine.name}
						alignText="left"
						rightIcon={IconNames.CARET_DOWN}
					/>
				</Select>
			</div>
			{/* 
			       Api Status
			 */}
			<div css={{ display: 'flex', alignItems: 'center' }}>
				<span
					// @ts-ignore
					css={{
						fontSize: 'var(--fs-desktopM2)',
						fontWeight: 'var(--fw-regular)',
						marginRight: 8,
						marginBottom: 0,
					}}
				>
					Key
				</span>
				<Popover
					onClose={() => send({ type: SET_API_TOKEN, apiToken })}
					isOpen={showPopup}
					onInteraction={(nextState) => setShowPopup(nextState)}
				>
					<Button
						aria-label="api-status"
						small={true}
						icon={
							<Icon icon={IconNames.KEY} color={isAuthenticated ? Colors.GREEN5 : Colors.RED3} />
						}
					/>
					<InputGroup
						large={true}
						leftIcon="key"
						onChange={(e) => setApiToken(e.target.value)}
						placeholder="Enter your api key"
						value={apiToken}
						onKeyDown={(e) => {
							const code = e.keyCode ? e.keyCode : e.which
							// enter key
							if (code === 13) {
								setShowPopup(false)
							}
						}}
					/>
				</Popover>
			</div>
		</>
	)
}
