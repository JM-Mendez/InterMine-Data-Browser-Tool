import { styled } from 'linaria/react'
import React from 'react'

import * as Icons from '../images/icons'

// Components have the first letter capitalized, but the props are lowercase
const formatName = (name) => {
	const uppercaseFirstLetter = name.charAt(0).toUpperCase()
	return `${uppercaseFirstLetter}${name.slice(1)}Icon`
}

const StyledIcon = styled.div`
	margin: 0 4px;
	width: 16px;
	height: 16px;

	& svg path {
		width: 100%;
		fill: ${(props) => props.fill};
	}
`

export const Icon = ({ name, iconColor }) => {
	const IconComponent = Icons[formatName(name)]

	return (
		<StyledIcon fill={iconColor}>
			<IconComponent />
		</StyledIcon>
	)
}
