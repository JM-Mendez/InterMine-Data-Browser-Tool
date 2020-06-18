import { IconNames, IconSvgPaths16 as BI16, IconSvgPaths20 as BI20 } from '@blueprintjs/icons'

const usedIcons = [IconNames.TICK_CIRCLE, IconNames.CARET_DOWN, IconNames.UNLOCK, IconNames.LOCK]

const IconSvgPaths16 = {}
const IconSvgPaths20 = {}

usedIcons.forEach((iconName) => {
	IconSvgPaths16[iconName] = BI16[iconName]
	IconSvgPaths20[iconName] = BI20[iconName]
})

export { IconSvgPaths16, IconSvgPaths20 }
