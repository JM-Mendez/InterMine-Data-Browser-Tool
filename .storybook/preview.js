import { addParameters } from '@storybook/react'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import { FocusStyleManager } from '@blueprintjs/core'
import { css } from 'linaria'

FocusStyleManager.onlyShowFocusOnTabs()

export const globals = css`
	:global() {
		div.sbdocs .sbdocs-content {
			max-width: 1000px;
		}
	}
`

addParameters({
	options: {
		showRoots: true,
	},
})
