import React from 'react'

import { ServiceContext, useMachineBus } from '../../machineBus2'
import { popupDecorator } from '../../utils/storybook'
import { ConstraintPopupCard } from '../Constraints/Constraint'
import { ConstraintPopup } from '../Constraints/ConstraintBase'
import { checkboxMachine, CheckBoxPopup } from './CheckboxPopup'

export default {
	title: 'Components/Popup Cards/CheckBox',
	decorators: [...popupDecorator],
}

// export const ConstraintNotSet = () => (
// 	<div css={{ maxWidth: 500, minWidth: 376 }}>
// 		<ConstraintPopup>
// 			<OrganismPopup selectedOrganisms={[]} organisms={organismSummary.results} />
// 		</ConstraintPopup>
// 	</div>
// )

// export const ConstraintsChanged = () => (
// 	<div css={{ maxWidth: 500, minWidth: 376 }}>
// 		<ConstraintPopup addEnabled={true} constraintSet={false}>
// 			<OrganismPopup
// 				selectedOrganisms={organismSummary.results.map((i) => ({ value: i.item }))}
// 				organisms={organismSummary.results}
// 			/>
// 		</ConstraintPopup>
// 	</div>
// )

// export const ConstraintsApplied = () => (
// 	<div css={{ maxWidth: 500, minWidth: 376 }}>
// 		<ConstraintPopup removeEnabled={true} constraintSet={true}>
// 			<OrganismPopup
// 				selectedOrganisms={organismSummary.results.slice(0, 3).map((i) => ({ value: i.item }))}
// 				organisms={organismSummary.results}
// 			/>
// 		</ConstraintPopup>
// 	</div>
// )

// const service = interpret(organismMachine)

export const Playground = () => {
	const [state, send] = useMachineBus(checkboxMachine)

	return (
		<div css={{ maxWidth: 500, minWidth: 376 }}>
			<ServiceContext.Provider value={{ state, send }}>
				<ConstraintPopupCard>
					<CheckBoxPopup
						title="No organisms found"
						description="If you feel this is a mistake, try refreshing the browser. If that doesn't work, let us know"
					/>
				</ConstraintPopupCard>
			</ServiceContext.Provider>
		</div>
	)
}
