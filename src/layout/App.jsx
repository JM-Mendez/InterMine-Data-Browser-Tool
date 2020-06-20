import { styled } from 'linaria/react'
import React from 'react'

import { withTheme } from '../theme'
import { ChartSection } from './ChartSection'
import { ConstraintSection } from './ConstraintSection'
import { Header } from './Header'
import { TableSection } from './TableSection'

const StyledTableChartsSection = withTheme(
	styled.section`
		background-color: ${({ theme }) => theme.colors.bluePalette.blue000};
		padding: 10px 30px 0;
		overflow: auto;
		height: calc(100vh - 3.643em);
	`
)

const StyledMain = styled.main`
	display: grid;
	grid-template-columns: 230px 1fr;
`

export const App = () => {
	return (
		<div className="light-theme">
			<Header />
			<StyledMain>
				<ConstraintSection />
				<StyledTableChartsSection>
					<ChartSection />
					<TableSection />
				</StyledTableChartsSection>
			</StyledMain>
		</div>
	)
}
