import imjs from 'imjs'
import PropTypes from 'prop-types'
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
		y: cy - cy * 0.9,
		textAnchor: 'middle',
		verticalAnchor: 'middle',
	}

	return (
		<Text fill="var(--blue9)" fontSize="var(--fs-desktopS2)" {...positioningProps}>
			{'Number of results for Genes by organism '}
		</Text>
	)
}

export const PieChart = ({ width, height }) => {
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
		<ResponsiveContainer width={width} height={height}>
			<RPieChart>
				<Pie
					data={chartData}
					dataKey="value"
					nameKey="name"
					cy="53%"
					innerRadius={60}
					paddingAngle={1}
				>
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

PieChart.propTypes = {
	/**
	 * The width to set for the responsive container. Can be a percentage string,
	 * or number.
	 *
	 * *NB:* __Either__ width or height __must__ be set as a percentage
	 */
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/**
	 * The height to set for the responsive container. Can be a percentage string,
	 * or number.
	 *
	 * *NB:* __Either__ width or height __must__ be set as a percentage
	 */
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

PieChart.defaultProps = {
	width: '100%',
	height: '100%',
}
