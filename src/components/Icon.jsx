import { styled } from 'linaria/react'
import React from 'react'

import * as Icons from '../images/icons'

// Components have the first letter capitalized, but the props are lowercase
const formatName = (name) => {
	const lc = name.toLowerCase()
	const uppercaseFirstLetter = name.charAt(0).toUpperCase()
	return `${uppercaseFirstLetter}${lc.slice(1)}`
}

const StyledIcon = styled.span`
	& svg path {
		fill: ${(props) => props.fill};
	}
`

export const Icon = ({ name, iconColor }) => {
	const IconComponent = Icons[formatName(name)]

	return (
		<StyledIcon>
			<IconComponent fill={iconColor} />
		</StyledIcon>
	)
}
