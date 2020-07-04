import React from 'react'
import { Machine } from 'xstate'

import { ServiceContext, useMachineBus } from '../../machineBus2'
import { organismSummary } from '../../stubs/geneSummaries'
import { popupDecorator } from '../../utils/storybook'
import { ConstraintPopupCard } from '../Constraints/Constraint'
import { checkboxMachine, CheckboxPopup } from './CheckboxPopup'

export default {
	title: 'Components/Popup Cards/CheckBox',
	decorators: [...popupDecorator],
}

const mockCheckboxMachine = (initialState, selected) =>
	Machine({
		id: 'mockmachine',
		initial: initialState,
		context: {
			selectedValues: selected,
			availableValues: organismSummary.results,
		},
		states: {
			noConstraintsSet: {},
			constraintsUpdated: {},
			constraintsApplied: {},
			constraintsLimitReached: {},
		},
	})

const CheckboxBuilder = ({ initialState = '', selectedValues = [], machine = null }) => {
	const [state, send] = useMachineBus(
		machine ? machine : mockCheckboxMachine(initialState, selectedValues)
	)

	return (
		<div css={{ maxWidth: 500, minWidth: 376 }}>
			<ServiceContext.Provider value={{ state, send }}>
				<ConstraintPopupCard>
					<CheckboxPopup
						title="No organisms found"
						description="If you feel this is a mistake, try refreshing the browser. If that doesn't work, let us know"
					/>
				</ConstraintPopupCard>
			</ServiceContext.Provider>
		</div>
	)
}

export const ConstraintNotSet = () => (
	<CheckboxBuilder initialState="noConstraintsSet" selectedValues={[]} />
)

export const ConstraintsChanged = () => (
	<CheckboxBuilder
		initialState="constraintsUpdated"
		selectedValues={['M. musculus', 'H. sapiens']}
	/>
)

export const ConstraintsApplied = () => (
	<CheckboxBuilder
		initialState="constraintsApplied"
		selectedValues={['H. sapiens', 'C. elegans']}
	/>
)

export const Playground = () => {
	const machine = checkboxMachine.withContext({
		selectedValues: [],
		availableValues: organismSummary.results,
	})

	return <CheckboxBuilder machine={machine} />
}