import React from 'react'

import { ServiceContext, useMachineBus } from '../../machineBus'
import { popupDecorator } from '../../utils/storybook'
import { ConstraintPopupCard } from './Constraint'
import { SelectPopup } from './SelectPopup'
import { machineStub } from './utils'

export default {
	decorators: [...popupDecorator],
	title: 'Components/Popup Cards/Select',
}

export const SelectBuilder = ({
	initialState,
	selectedValues = [],
	availableValues = [],
	machine = null,
}) => {
	const [state, send] = useMachineBus(
		machine ? machine : machineStub(initialState, availableValues, selectedValues)
	)

	return (
		<div css={{ maxWidth: 500, minWidth: 376 }}>
			<ServiceContext.Provider value={{ state, send }}>
				<ConstraintPopupCard>
					<SelectPopup />
				</ConstraintPopupCard>
			</ServiceContext.Provider>
		</div>
	)
}
