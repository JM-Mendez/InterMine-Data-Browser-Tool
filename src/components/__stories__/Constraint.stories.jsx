import React from 'react'

import { ServiceContext, useMachineBus } from '../../machineBus2'
import { checkboxMachine } from '../ConstraintPopup/CheckboxPopup'
import { Constraint } from '../Constraints/Constraint'

export default {
	title: 'Components/Constraint',
	decorators: [(storyFn) => <div style={{ marginTop: 20, maxWidth: '320px' }}>{storyFn()}</div>],
}

export const Example = () => {
	const [state, send] = useMachineBus(checkboxMachine)

	return (
		<ServiceContext.Provider value={{ state, send }}>
			<Constraint constraintName="Organism" constraintIconText="Or" />
		</ServiceContext.Provider>
	)
}
