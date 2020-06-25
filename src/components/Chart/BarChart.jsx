import imjs from 'imjs'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart as RBarChart, CartesianGrid } from 'recharts'

import { geneLengthQueryStub, mineUrl } from '../../stubs/utils'

export const BarChart = () => {
	const [chartData, setChartData] = useState([])
	const service = new imjs.Service({ root: mineUrl })
	const query = new imjs.Query(geneLengthQueryStub, service)

	useEffect(() => {
		const runQuery = async () => {
			try {
				const summary = await query.summarize('Gene.length', 50)

				const { max, min, buckets, uniqueValues, average, stdev } = summary.stats

				const elementsPerBucket = (max - min) / buckets
				const stdevFixed = parseFloat(stdev).toFixed(3)
				const avgFixed = parseFloat(average).toFixed(3)

				// const countData = []
				// const labelsData = []
				// const onHoverLabel = []
				// summary.results.forEach((_, i) => {
				// 	if (i < summary.results.length - 1) {
				// 		const lowerLimit = Math.round(min + elementsPerBucket * i)
				// 		const upperLimit = Math.round(min + elementsPerBucket * (i + 1))

				// 		countData.push(Math.log2(summary.results[i].count + 1))
				// 		labelsData.push(`${lowerLimit} — ${upperLimit}`)
				// 		onHoverLabel.push(`${lowerLimit} to ${upperLimit}: ${summary.results[i].count} values`)
				// 	}
				// })

				// setChartData({ countData, labelsData, onHoverLabel })

				// const chartTitle = `Distribution of ${uniqueValues} Gene Lengths`
				// const chartSubtitle = `Min: ${min}
				// Max: ${max}
				// Avg: ${avgFixed}
				// Stdev: ${stdevFixed}`

				// setTitles([chartTitle, chartSubtitle])
				const data = summary.results.flatMap((item, i) => {
					if (i === summary.results.length - 1) return []

					const lowerLimit = Math.round(min + elementsPerBucket * i)
					const upperLimit = Math.round(min + elementsPerBucket * (i + 1))

					const count = Math.log2(summary.results[i].count + 1)
					const name = `${lowerLimit} — ${upperLimit}`
					// const onHoverLabel = `${lowerLimit} to ${upperLimit}: ${summary.results[i].count} values`

					return [
						{
							name,
							count,
						},
					]
				})

				setChartData(data)
			} catch (e) {
				console.error(e.message)
			}
		}

		runQuery()
		// we only run this once for now until we hook in state
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<RBarChart width={600} height={350} data={chartData}>
			<Bar dataKey="count" />
			<CartesianGrid strokeDasharray="3 3" vertical={false} />
		</RBarChart>
	)
}
