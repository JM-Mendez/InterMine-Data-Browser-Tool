import { Button, Colors, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { css } from 'linaria'
import React, { useState } from 'react'

const label = css`
	font-size: var(--fs-desktopM2);
	font-weight: var(--fw-regular);
	margin-right: 8px;
	margin-bottom: 0;
`
const apiStatusContainer = css`
	display: flex;
	align-items: center;
`

const AuthenticatedIcon = (isAuthenticated) => (
	<Icon
		icon={isAuthenticated ? IconNames.UNLOCK : IconNames.LOCK}
		color={isAuthenticated ? Colors.GREEN5 : Colors.RED3}
	/>
)

export const ApiStatus = () => {
	const [isAuthenticated, setAuthentication] = useState(false)

	return (
		<div className={apiStatusContainer}>
			<span className={label}>Api</span>
			<Button
				aria-label="api-status"
				small={true}
				icon={AuthenticatedIcon(isAuthenticated)}
				onClick={() => setAuthentication(!isAuthenticated)}
			/>
		</div>
	)
}
