import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { styled } from 'linaria/react'
import React from 'react'

const ButtonRow = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 40px;
`
const StyledCodeSnippet = styled(ButtonGroup)`
	margin: 0px 16px;
`

const StyledInputGroup = styled(InputGroup)`
	width: 30px;
`

const S = {
	ButtonRow,
	CodeSnippet: StyledCodeSnippet,
	PageInput: StyledInputGroup,
}

const SaveAsList = () => (
	<Button outlined={true} intent="primary" icon={IconNames.CLOUD_UPLOAD} text="Save As List" />
)

const CodeSnippet = () => (
	<S.CodeSnippet>
		<Button outlined={true} intent="primary" icon={IconNames.CODE} text="code snippet" />
		<Button outlined={true} intent="primary" icon={IconNames.CARET_DOWN} />
	</S.CodeSnippet>
)

const Export = () => (
	<Button intent="primary" outlined={true} icon={IconNames.ARCHIVE} text="Export" />
)

export const TableActionButtons = () => {
	return (
		<S.ButtonRow>
			<SaveAsList />
			<CodeSnippet />
			<Export />
		</S.ButtonRow>
	)
}

const PageButtons = () => (
	<ButtonGroup>
		<Button icon={IconNames.CHEVRON_BACKWARD} />
		<S.PageInput value={1} round={false} />
		<Button icon={IconNames.CHEVRON_FORWARD} />
	</ButtonGroup>
)

export const TablePagingButtons = () => {
	return <PageButtons />
}
