import { styled } from 'linaria/react'
import React from 'react'

import * as Constraints from '../components/Constraints'
import { QueryController } from '../components/QueryController'

const S = {}

S.Constraint = styled.li`
	margin: 0.875em 0;
`
S.ConstraintList = styled.ul`
	overflow: auto;
	list-style: none;
	padding: 0;
	height: 77vh;
`

S.ConstraintSection = styled.section`
	min-width: 230px;
	border-right: 2px solid var(--blue5);
`

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

export const ConstraintSection = () => {
	return (
		<S.ConstraintSection>
			<QueryController />
			<S.ConstraintList>
				{constraintMocks.map((c, idx) => (
					<S.Constraint key={idx}>{Constraints.renderConstraint(c)}</S.Constraint>
				))}
			</S.ConstraintList>
		</S.ConstraintSection>
	)
}
