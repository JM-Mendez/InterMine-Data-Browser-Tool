import { Card, Colors, H1 } from '@blueprintjs/core'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import React from 'react'

import logo from '../images/logo.png'
import { useTheme, withTheme } from '../theme'
import * as Constraints from './Constraints'
import { NavigationBar } from './NavBar/NavBar'
import { QueryController } from './QueryController'

const StyledLogoContainer = withTheme(
	styled.div`
		min-width: 230px;
		height: 50px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: ${({ theme }) => theme.colors.bluePalette.blue000};
		border-right: ${`2px solid ${Colors.COBALT1}`};
		border-bottom: ${`2px solid ${Colors.COBALT1}`};
	`
)

const ConstraintsContainer = styled.div`
	min-width: 230px;
	border-right: ${`2px solid ${Colors.COBALT1}`};
`

const StyledTableChartsSection = withTheme(
	styled.section`
		background-color: ${({ theme }) => theme.colors.bluePalette.blue000};
		padding: 10px 30px 0;
	`
)

const constraintMocks = [
	Constraints.INTERMINE_LIST,
	Constraints.SYMBOL_CONSTRAINT,
	Constraints.NAME,
	Constraints.IDENTIFIERS,
	Constraints.LENGTH,
	Constraints.ORGANISM,
	Constraints.PATHWAY_NAME,
	Constraints.GO_ANNOTATION,
	Constraints.EXPRESSSION,
	Constraints.INTERACTIONS,
	Constraints.DISEASES,
	Constraints.CLIN_VAR,
	Constraints.PROTEIN_DOMAIN_NAME,
	Constraints.PHENOTYPE,
	Constraints.DATASET_NAME,
]

export const App = () => {
	const theme = useTheme()

	return (
		<div className={theme.lightTheme}>
			<header
				className={css`
					display: inline-flex;
					width: 100%;
				`}
			>
				<StyledLogoContainer>
					<img width="120px" src={logo} alt="Logo" />
				</StyledLogoContainer>
				<NavigationBar />
			</header>
			<main
				className={css`
					display: grid;
					grid-template-columns: 230px 1fr;
				`}
			>
				<ConstraintsContainer>
					<div
						className={css`
							margin: 0 20px;
						`}
					>
						<QueryController />
					</div>
					<ul
						className={css`
							overflow: auto;
							list-style: none;
							padding: 0;
							height: 77vh;
						`}
					>
						{constraintMocks.map((c) => (
							<li
								className={css`
									margin: 0.875em 0;
								`}
							>
								{Constraints.renderConstraint(c)}
							</li>
						))}
					</ul>
				</ConstraintsContainer>
				<StyledTableChartsSection>
					<Card
						className={css`
							height: 380px;
							margin-bottom: 20px;
						`}
					>
						<H1>Chart goes here</H1>
					</Card>
					<Card
						className={css`
							height: 500px;
							margin-bottom: 20px;
						`}
					>
						<H1>Table goes here</H1>
					</Card>
				</StyledTableChartsSection>
			</main>
		</div>
	)
}
