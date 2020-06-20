import { Card, H1 } from '@blueprintjs/core'
import { css } from 'linaria'
import React from 'react'

const table = css`
	height: 500px;
	margin-bottom: 20px;
`

export const TableSection = () => {
	return (
		<section>
			<Card className={table}>
				<H1>Table goes here</H1>
			</Card>
		</section>
	)
}
