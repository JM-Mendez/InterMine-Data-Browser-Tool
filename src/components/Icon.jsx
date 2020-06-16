import { styled } from 'linaria/react'
import React from 'react'

import * as Icons from '../images/icons'

// Components have the first letter capitalized, but the props are lowercase
const formatName = (name) => {
	const uppercaseFirstLetter = name.charAt(0).toUpperCase()
	return `${uppercaseFirstLetter}${name.slice(1)}Icon`
}

const StyledIcon = styled.div`
	& svg path {
		fill: ${(props) => props.fill};
	}
`

export const Icon = ({ name, iconColor, wrapperClassName }) => {
	if (name === undefined || name === 'none') return null

	const IconComponent = Icons[formatName(name)]

	return (
		<StyledIcon fill={iconColor} className={wrapperClassName}>
			<IconComponent width="100%" height="auto" viewBox="0 0 16 16" />
		</StyledIcon>
	)
}
