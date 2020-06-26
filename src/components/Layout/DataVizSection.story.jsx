import { styled } from 'linaria/react'
import React from 'react'

import { ConstraintSection as Constraints } from './ConstraintSection'
import { TableChartSection } from './DataVizSection'

export default {
	title: 'Components/Layout Sections',
}

const S_ConstraintSection = styled.div`
	max-width: 200px;
`

export const DataVizSection = () => <TableChartSection />

export const ConstraintSection = () => (
	<S_ConstraintSection>
		<Constraints />
	</S_ConstraintSection>
)
