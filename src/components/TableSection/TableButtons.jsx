import { Button } from '@blueprintjs/core'
import { styled } from 'linaria/react'
import React from 'react'

const ButtonRow = styled.div`
	float: right;
	margin-bottom: 40px;
`
const StyledCodeSnippet = styled(Button)`
	margin: 0px 16px;
`

const S = {
	ButtonRow,
	CodeSnippet: StyledCodeSnippet,
}

const SaveAsList = () => <Button text="Save As List" />

const CodeSnippet = () => <S.CodeSnippet text="code snippet" />

const Export = () => <Button text="Export" />

export const TableButtons = () => {
	return (
		<S.ButtonRow>
			<SaveAsList />
			<CodeSnippet />
			<Export />
		</S.ButtonRow>
	)
}
