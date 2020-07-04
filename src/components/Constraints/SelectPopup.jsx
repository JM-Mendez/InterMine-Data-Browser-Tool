import { NonIdealState } from '@blueprintjs/core'
import React from 'react'

import { useServiceContext } from '../../machineBus'
import { NoValuesProvided } from './NoValuesProvided'

export const SelectPopup = ({ nonIdealTitle, nonIdealDescription }) => {
	// const [state, send] = useServiceContext()

	// const { availableValues } = state?.constext

	return <NoValuesProvided title={nonIdealTitle} description={nonIdealDescription} />
}
