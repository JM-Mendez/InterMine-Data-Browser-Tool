import { number, withKnobs } from '@storybook/addon-knobs'
import React from 'react'

import * as Constraints from './'
import { Constraint } from './ConstraintBase'

export default {
	component: Constraint,
	title: 'Components/Constraints',
	decorators: [(storyFn) => <div style={{ maxWidth: '250px' }}>{storyFn()}</div>],
}

export const ConstraintBase = () => (
	<Constraint
		constraintName="Example Constraint"
		labelText="EC"
		constraintCount={number('Constraint Count', 0)}
		labelBorderColor="red"
	/>
)

ConstraintBase.story = {
	decorators: [withKnobs, (storyFn) => <div style={{ width: '1000px' }}>{storyFn()}</div>],
}

export const IntermineList = () => <Constraints.IntermineList />
export const Symbol = () => <Constraints.SymbolConstraint />
export const Name = () => <Constraints.Name />
export const Identifiers = () => <Constraints.Identifiers />
export const Length = () => <Constraints.Length />
export const Organism = () => <Constraints.Organism />
export const PathwayName = () => <Constraints.PathwayName />
export const GOAnnotation = () => <Constraints.GOAnnotation />
export const Expression = () => <Constraints.Expression />
export const Interactions = () => <Constraints.Interactions />
export const Diseases = () => <Constraints.Diseases />
export const ClinVar = () => <Constraints.ClinVar />
export const ProteinDomainName = () => <Constraints.ProteinDomainName />
export const Phenotype = () => <Constraints.Phenotype />
export const DatasetName = () => <Constraints.DatasetName />
