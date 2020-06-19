import { Colors } from '@blueprintjs/core'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import React from 'react'

import * as Constraints from '../Constraints'
import { QueryController } from '../QueryController'

const ConstraintWrapper = styled.li`
	margin: 0.875em 0;
`
const ConstraintList = styled.ul`
	overflow: auto;
	list-style: none;
	padding: 0;
	height: 77vh;
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
		<section
			className={css`
				min-width: 230px;
				border-right: ${`2px solid ${Colors.COBALT1}`};
			`}
		>
			<QueryController />
			<ConstraintList>
				{constraintMocks.map((c, idx) => (
					<ConstraintWrapper key={idx}>{Constraints.renderConstraint(c)}</ConstraintWrapper>
				))}
			</ConstraintList>
		</section>
	)
}
