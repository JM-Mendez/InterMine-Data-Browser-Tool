import { styled } from 'linaria/react'
import React from 'react'

import { ConstraintSection } from './Layout/ConstraintSection'
import { ChartSection, TableSection } from './Layout/DataVizSection'
import { Header } from './Layout/Header'

const StyledTableChartsSection = styled.section`
	padding: 10px 30px 0;
	overflow: auto;
	height: calc(100vh - 3.643em);
`

const Main = styled.main`
	display: grid;
	grid-template-columns: 230px 1fr;
`

const S = {
	Main,
	TableChartsSection: StyledTableChartsSection,
}

export const App = () => {
	return (
		<div className="light-theme">
			<Header />
			<S.Main>
				<ConstraintSection />
				<S.TableChartsSection>
					<ChartSection />
					<TableSection />
				</S.TableChartsSection>
			</S.Main>
		</div>
	)
}
