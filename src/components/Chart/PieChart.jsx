import imjs from 'imjs'
import pattern from 'patternomaly'
import React, { useEffect, useState } from 'react'
import { Pie, PieChart as RPieChart } from 'recharts'

import { geneQueryStub, mineUrl } from '../../stubs/utils'

const colorPalette = [
	pattern.draw('dot', '#898cff '),
	'#90d4f7',
	pattern.draw('dot-dash', '#71e096'),
	'#fcdc89',
	'#f5a26e',
	pattern.draw('diagonal', '#f589b6'),
	'#668de5',
	'#ed6d79',
	'#5ad0e5',
	'#cff381',
	'#f696e3',
	'#bb96ff',
	'#67eebd',
]

export const PieChart = () => {
	const [chartData, setChartData] = useState([])

	const service = new imjs.Service({ root: mineUrl })
	const query = new imjs.Query(geneQueryStub, service)

	useEffect(() => {
		const runQuery = async () => {
			try {
				const summary = await query.summarize('Gene.organism.shortName', 50)

				const data = summary.results.map((item) => ({
					name: `${item.item} ${item.count}`,
					value: item.count,
				}))
				// data.push(item.count)
				// labels.push(`${item.item} (${item.count})`)

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
		<RPieChart width={600} height={340}>
			<Pie data={chartData} dataKey="value" nameKey="name" fill="#8884d8" innerRadius={60} />
		</RPieChart>
	)
}
