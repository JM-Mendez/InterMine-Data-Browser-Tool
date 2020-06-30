import { Button, Classes } from '@blueprintjs/core'
import { css } from 'linaria'
import React from 'react'

export const CloseButton = () => (
	<div
		className={css`
			display: flex;
			width: 100%;
			justify-content: flex-end;
		`}
	>
		<Button text="Dismiss" className={Classes.POPOVER_DISMISS} intent="danger" />
	</div>
)
