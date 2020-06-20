import { css } from 'linaria'
import React from 'react'

import { ChartSection } from './ChartSection'
import { TableSection } from './TableSection'

const section = css`
	padding: 10px 30px 0;
	overflow: auto;
	height: calc(100vh - 3.643em);
`
export const TableChartsSection = () => {
	return (
		<section className={section}>
			<ChartSection />
			<TableSection />
		</section>
	)
}
