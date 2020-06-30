import imjs from 'imjs'
import React, { useEffect, useState } from 'react'
import {
	Cell,
	Label,
	Legend,
	Pie,
	PieChart as RPieChart,
	ResponsiveContainer,
	Text,
	Tooltip,
} from 'recharts'
import { Machine } from 'xstate'

import { useMachineBus } from '../../machineBus'
import { orrganismSummary } from '../../stubs/geneSummaries'
import { geneQueryStub, mineUrl } from '../../stubs/utils'
import { DATA_VIZ_COLORS } from './dataVizColors'

const renderLabelContent = (props) => {
	const {
		viewBox: { cx, cy },
	} = props

	return (
		<Text
			fill="var(--blue9)"
			fontSize="var(--fs-desktopS2)"
			x={cx}
			y={cy - cy * 0.95}
			textAnchor="middle"
			verticalAnchor="middle"
		>
			{'Number of results for Genes by organism '}
		</Text>
	)
}

export const PieChartMachine = Machine({
	id: 'PieChart',
	initial: 'idle',
	context: {
		classItems: orrganismSummary.results,
	},
	states: {
		idle: {},
	},
})

export const PieChart = () => {
	const [state] = useMachineBus(PieChartMachine)

	const chartData = state.context.classItems.map(({ item, count }) => ({
		name: item,
		value: count,
	}))

	return (
		<ResponsiveContainer width="100%" height="100%">
			<RPieChart>
				<Pie
					data={chartData}
					dataKey="value"
					nameKey="name"
					cy="52%"
					innerRadius={60}
					paddingAngle={1}
				>
					{chartData.map((entry, index) => (
						<Cell key={entry} fill={DATA_VIZ_COLORS[index % DATA_VIZ_COLORS.length]} />
					))}
					<Label content={renderLabelContent} />
				</Pie>
				<Tooltip
					labelStyle={{
						color: 'var(--blue9)',
					}}
					contentStyle={{
						borderRadius: '30px',
					}}
					wrapperStyle={{
						border: '2px solid var(--blue9)',
						borderRadius: '30px',
					}}
					separator=""
					formatter={(value, name) => [value, `${name}: `]}
				/>
				<Legend
					iconType="circle"
					formatter={(value, _, index) => <span>{`${value} (${chartData[index].value})`}</span>}
				/>
			</RPieChart>
		</ResponsiveContainer>
	)
}
