import { Card, H1 } from '@blueprintjs/core'
import { styled } from 'linaria/react'
import React from 'react'

const StyledChart = styled(Card)`
	height: 380px;
	margin-bottom: 20px;
`

export const ChartSection = () => {
	return (
		<section>
			<StyledChart>
				<H1>Chart goes here</H1>
			</StyledChart>
		</section>
	)
}
