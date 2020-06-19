import { Button, Colors, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useState } from 'react'

import { StyledNavHeading } from './StyledNavHeading'
const AuthenticatedIcon = (isAuthenticated) => (
	<Icon
		icon={isAuthenticated ? IconNames.UNLOCK : IconNames.LOCK}
		color={isAuthenticated ? Colors.GREEN5 : Colors.RED3}
	/>
)

export const ApiStatus = () => {
	const [isAuthenticated, setAuthentication] = useState(false)
	return (
		<>
			<StyledNavHeading>Api Key</StyledNavHeading>
			<Button
				aria-label="Press button to enter your api key"
				small={true}
				icon={AuthenticatedIcon(isAuthenticated)}
				onClick={() => setAuthentication(!isAuthenticated)}
			/>
		</>
	)
}
