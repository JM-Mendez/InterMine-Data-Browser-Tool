import { Card } from '@blueprintjs/core'
import React from 'react'

import { OrganismPopup } from '../Constraints/Organism'

export default {
	title: 'Components/Popup Cards/Constraints/Organism',
	decorators: [(storyFn) => <Card css={{ maxWidth: 500 }}>{storyFn()}</Card>],
}

export const OrganismPopupCard = () => <OrganismPopup />
