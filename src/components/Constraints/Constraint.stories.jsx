import React from 'react'

import { ConstraintServiceContext, useMachineBus } from '../../machineBus'
import { CheckboxPopup } from './CheckboxPopup'
import { createConstraintMachine } from './common'
import { Constraint } from './Constraint'

export default {
	title: 'Components/Constraint',
	decorators: [(storyFn) => <div style={{ marginTop: 20, maxWidth: '320px' }}>{storyFn()}</div>],
}

export const Example = () => {
	const [state, send] = useMachineBus(createConstraintMachine({ id: 'mockmachine' }))

	return (
		<ConstraintServiceContext.Provider value={{ state, send }}>
			<Constraint constraintName="Organism" constraintIconText="Or">
				<CheckboxPopup
					title="No organisms found"
					description="If you feel this is a mistake, try refreshing the browser. If that doesn't work, let us know"
				/>
			</Constraint>
		</ConstraintServiceContext.Provider>
	)
}
