import { Card } from '@blueprintjs/core'
import { styled } from 'linaria/react'
import React from 'react'

import { humanMine25 as rows } from '../../stubs/humanMine25'
import { Table } from './Table'
import { TableButtons } from './TableButtons'

const mineUrl = 'https://www.humanmine.org/humanmine'

const TableCard = styled(Card)`
	margin-bottom: 20px;
	overflow: scroll;
	padding-bottom: unset;
`

const S = {
	TableCard,
}

export const TableSection = () => {
	return (
		<section>
			<S.TableCard>
				<TableButtons />
				<Table mineUrl={mineUrl} rows={rows} />
			</S.TableCard>
		</section>
	)
}
