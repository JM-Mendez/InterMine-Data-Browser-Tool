import { Card, H1 } from '@blueprintjs/core'
import { styled } from 'linaria/react'
import React from 'react'

const StyledChart = styled(Card)`
	height: 500px;
	margin-bottom: 20px;
`

export const TableSection = () => {
	return (
		<section>
			<StyledChart>
				<H1>Table goes here</H1>
			</StyledChart>
		</section>
	)
}
