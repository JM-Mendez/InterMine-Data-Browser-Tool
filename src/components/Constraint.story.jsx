import { number, select, text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'

import { allColors } from '../theme/colorPalette'
import { Constraint } from './Constraint'

export default {
	component: Constraint,
	title: 'Components/Constraint',
	decorators: [
		withKnobs,
		(storyFn) => (
			<div style={{ height: '200px', padding: '20px', width: '500px' }}>{storyFn()}</div>
		),
	],
}

export const Example = () => (
	<Constraint
		constraintName={select('Constraint Name', ['Name', 'Protein Domain Name', 'ClinVar'])}
		constraintCount={number('Constraint Count', 0)}
		labelBorderColor={select('Label Border Color', allColors, 'red')}
		ariaLabel={text('Screen Reader Text', 'this is a constraint')}
	/>
)
