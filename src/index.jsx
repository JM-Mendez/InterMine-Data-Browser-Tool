import 'normalize.css'
import './theme/theme.scss'

import { FocusStyleManager } from '@blueprintjs/core'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './components/App/App'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from './theme'

FocusStyleManager.onlyShowFocusOnTabs()

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
