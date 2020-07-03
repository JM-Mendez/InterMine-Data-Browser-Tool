import { Checkbox, Label, NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import PropTypes from 'prop-types'
import React from 'react'

export const CheckBoxPopup = ({
	constraintChangeHandler = (_value) => (_e) => {},
	availableValues = [],
	selectedValues = [],
}) => {
	if (availableValues.length === 0) {
		return (
			<NonIdealState
				title="No organisms found"
				description="If you feel this is a mistake, try refreshing the browser. If that doesn't work, let us know"
				icon={IconNames.WARNING_SIGN}
			/>
		)
	}

	return (
		<div>
			<Label className="sr-only">Select organisms to set constraints</Label>
			{availableValues.map((value) => (
				<Checkbox
					key={value.item}
					label={`${value.item} (${value.count})`}
					checked={selectedValues.some((o) => o.value === value.item)}
					onChange={constraintChangeHandler(value.item)}
				/>
			))}
		</div>
	)
}

CheckBoxPopup.propTypes = {
	checkAll: PropTypes.bool,
	disableAll: PropTypes.bool,
}
