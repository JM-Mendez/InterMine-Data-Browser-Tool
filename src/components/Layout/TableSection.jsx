import { Card, Classes, HTMLTable, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Cell, Column, Table } from '@blueprintjs/table'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import React from 'react'
import { humanize, titleize } from 'underscore.string'

import { humanMine25 as rows } from '../../stubs/humanMine25'

const TableCard = styled(Card)`
	height: 500px;
	margin-bottom: 20px;
`

const StyledCell = styled(Cell)`
	font-size: var(--fs-desktopS2);
	display: flex;
	align-items: center;

	& .${Classes.ICON} {
		padding-right: 5px;
	}
`

const StyledTable = styled(Table)``

const S = {
	TableCard,
	Cell: StyledCell,
}

const mineUrl = 'https://www.humanmine.org/humanmine'

const cellRenderer = (rowIndex, columnIndex) => {
	const cell = rows[rowIndex][columnIndex]
	const cellValue = cell.value

	return (
		<S.Cell key={`${rowIndex}${columnIndex}`} wrapText={true}>
			{cellValue ? (
				// disable this rule since we do want to know who the referrer is
				// eslint-disable-next-line react/jsx-no-target-blank
				<a href={`${mineUrl}${cell.url}`} target="_blank">
					<Icon icon={IconNames.GLOBE_NETWORK} />
					{cellValue}
				</a>
			) : (
				<span className={Classes.TEXT_DISABLED}>No Value</span>
			)}
		</S.Cell>
	)
}

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

export const TableSection = () => {
	return (
		<section>
			<S.TableCard>
				<HTMLTable
					className={css`
						width: 100%;
					`}
				>
					<thead>
						<tr>
							{rows[0].map((r) => {
								return <ColumnHeader key={r.column} columnName={r.column} />
							})}
						</tr>
					</thead>
				</HTMLTable>
			</S.TableCard>
		</section>
	)
}
