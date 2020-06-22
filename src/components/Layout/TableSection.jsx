import { Card, Icon } from '@blueprintjs/core'
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

const S = {
	TableCard,
}

const mineUrl = 'https://www.humanmine.org/humanmine'

const cellRenderer = (rowIndex, columnIndex) => {
	const cell = rows[rowIndex][columnIndex]
	const cellValue = cell.value
	return (
		<Cell>
			{cellValue ? (
				// disable this rule since we do want to know who the referrer is
				// eslint-disable-next-line react/jsx-no-target-blank
				<a href={`${mineUrl}${cell.url}`} target="_blank">
					<Icon icon={IconNames.GLOBE_NETWORK} />
					{cellValue}
				</a>
			) : (
				'No Value'
			)}
		</Cell>
	)
}

const headerTitle = (name) => {
	const sanitizedName = titleize(humanize(name.replace(/\./g, ' ')))
	return sanitizedName
}

const headerNameRenderer = (name) => {
	const words = name.split(' ')
	const className = words.shift()
	const specifier = words.join(' ')

	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;
			`}
		>
			<span>{className}</span>
			<span>{specifier}</span>
		</div>
	)
}

export const TableSection = () => {
	console.log(rows)
	return (
		<section>
			<S.TableCard>
				<Table
					numRows={rows.length}
					enableMultipleSelection={false}
					enableRowResizing={false}
					rowHeaderCellRenderer={() => null}
					renderMode="RenderMode.NONE"
				>
					{rows[0].map((r) => {
						return (
							<Column
								key={r.column}
								name={headerTitle(r.column)}
								nameRenderer={headerNameRenderer}
								cellRenderer={cellRenderer}
							/>
						)
					})}
				</Table>
			</S.TableCard>
		</section>
	)
}
