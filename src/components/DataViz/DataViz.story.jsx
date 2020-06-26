import { Card } from '@blueprintjs/core'
import { styled } from 'linaria/react'
import React from 'react'

import { humanMine25 as rows } from '../../stubs/humanMine25'
import { mineUrl } from '../../stubs/utils'
import { BarChart as Bar } from './BarChart'
import { PieChart as Pie } from './PieChart'
import { Table as TableComp } from './Table'

export default {
	title: 'Components/Data Visualization',
}
const S_Card = styled(Card)`
	height: 376px;
`

export const BarChart = () => (
	<S_Card>
		<Bar />
	</S_Card>
)

export const PieChart = () => (
	<S_Card>
		<Pie />
	</S_Card>
)

export const Table = () => (
	<Card>
		<TableComp mineUrl={mineUrl} rows={rows} />
	</Card>
)
