import { Card, Classes, HTMLTable, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import React from 'react'
import { humanize, titleize } from 'underscore.string'

import { humanMine25 as rows } from '../../stubs/humanMine25'

const StyledTable = styled(HTMLTable)`
	width: 100%;
`

const TableCard = styled(Card)`
	height: 500px;
	margin-bottom: 20px;
	overflow: scroll;
`

const StyledCell = styled.td`
	&& a {
		font-weight: normal;

		& .${Classes.ICON} {
			padding-right: 5px;
		}
	}
`

const S = {
	TableCard,
	Cell: StyledCell,
	Table: StyledTable,
}

const mineUrl = 'https://www.humanmine.org/humanmine'

const ColumnHeader = ({ columnName }) => {
	const name = titleize(humanize(columnName.replace(/\./g, ' ')))
	const words = name.split(' ')
	const className = words.shift()
	const specifier = words.join(' ')

	return (
		<th scope="col" title={`${className} ${specifier}`}>
			<span
				className={css`
					display: block;
				`}
			>
				{className}
			</span>
			<span>{specifier}</span>
		</th>
	)
}

const Cell = ({ cell }) => {
	const cellValue = cell.value

	return (
		<S.Cell scope="row">
			{cellValue ? (
				<div title={cellValue}>
					{/* disable this rule since we do want to know who the referrer is */}
					{/* eslint-disable-next-line react/jsx-no-target-blank */}
					<a href={`${mineUrl}${cell.url}`} target="_blank">
						<Icon icon={IconNames.GLOBE_NETWORK} />
						{cellValue}
					</a>
				</div>
			) : (
				<span className={Classes.TEXT_DISABLED}>No Value</span>
			)}
		</S.Cell>
	)
}

export const TableSection = () => {
	return (
		<section>
			<S.TableCard>
				<S.Table interactive={true} striped={true}>
					<thead>
						<tr>
							{rows[0].map((r) => {
								return <ColumnHeader key={r.column} columnName={r.column} />
							})}
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => {
							return (
								<tr>
									{row.map((cell) => (
										<Cell cell={cell} />
									))}
								</tr>
							)
						})}
					</tbody>
				</S.Table>
			</S.TableCard>
		</section>
	)
}
