import imjs from 'imjs'
import { css } from 'linaria'
import React, { useEffect, useState } from 'react'
import { Cell, Label, Legend, Pie, PieChart as RPieChart, Text, Tooltip } from 'recharts'

import { geneQueryStub, mineUrl } from '../../stubs/utils'

const colorPalette = [
	'#898cff ',
	'#90d4f7',
	'#71e096',
	'#fcdc89',
	'#f5a26e',
	'#f589b6',
	'#668de5',
	'#ed6d79',
	'#5ad0e5',
	'#cff381',
	'#f696e3',
	'#bb96ff',
	'#67eebd',
]

const renderLabelContent = (props) => {
	const {
		viewBox: { cx, cy },
	} = props
	const positioningProps = {
		x: cx,
		y: cy - 135,
		textAnchor: 'middle',
		verticalAnchor: 'middle',
	}

	return (
		<Text fill="var(--blue9)" fontSize="var(--fs-desktopS2)" {...positioningProps}>
			{'Number of results for Genes by organism '}
		</Text>
	)
}

export const PieChart = () => {
	const [chartData, setChartData] = useState([])

	const service = new imjs.Service({ root: mineUrl })
	const query = new imjs.Query(geneQueryStub, service)

	useEffect(() => {
		const runQuery = async () => {
			try {
				const summary = await query.summarize('Gene.organism.shortName', 50)

				const data = summary.results.map(({ item, count }) => ({
					name: item,
					value: count,
				}))

				setChartData(data)
			} catch (e) {
				console.error(e.message)
			}
		}

		runQuery()
		// we want to only run this once until we attach state
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<RPieChart width={600} height={350}>
			<Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} paddingAngle={1}>
				{chartData.map((entry, index) => (
					<Cell key={entry} fill={colorPalette[index % colorPalette.length]} />
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
			/>
			<Legend
				iconType="circle"
				formatter={(value, _, index) => <span>{`${value} (${chartData[index].value})`}</span>}
			/>
		</RPieChart>
	)
}
