import React from 'react'

import { Constraint } from './Constraint'

export default {
	component: Constraint,
	title: 'Components/Constraint',
	decorators: [(storyFn) => <div style={{ height: '200px', padding: '20px' }}>{storyFn()}</div>],
}

export const SingleWord = () => <Constraint />
