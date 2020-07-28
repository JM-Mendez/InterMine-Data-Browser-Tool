import { Button, Classes, Collapse, Divider, Tab, Tabs, Tag } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useState } from 'react'
import { CHANGE_CONSTRAINT_VIEW } from 'src/eventConstants'
import { sendToBus } from 'src/machineBus'

import { DATA_VIZ_COLORS } from './dataVizColors'
import { OverviewConstraint } from './Overview/OverviewConstraint'
import { QueryController } from './QueryController/QueryController'
import { TemplateQuery } from './Templates/TemplateQuery'

const ShowCategories = ({ classCategoryTags, handleCategoryToggle, showAll, showAllLabel }) => {
	const [showCategories, setShowCategories] = useState(false)

	return (
		<>
			<Button
				icon={showCategories ? IconNames.CARET_DOWN : IconNames.CARET_RIGHT}
				fill={true}
				alignText="left"
				text="Select Categories"
				minimal={true}
				large={true}
				onClick={() => setShowCategories(!showCategories)}
			/>
			<Collapse isOpen={showCategories} css={{ marginTop: 10 }}>
				<div css={{ backgroundColor: 'var(--blue0)', padding: 10 }}>
					{classCategoryTags.map(({ tagName, isVisible, count }) => {
						if (count === 0 && tagName !== showAllLabel) {
							return null
						}

						let isEnabled = false
						if (showAll) {
							isEnabled = tagName === showAllLabel
						} else {
							isEnabled = isVisible
						}

						return (
							<Tag
								key={tagName}
								intent="primary"
								interactive={true}
								onClick={() => handleCategoryToggle({ isVisible: !isVisible, tagName })}
								minimal={!isEnabled || count === 0}
								css={{ margin: 4 }}
							>
								{`${tagName} ${count ?? 0}`}
							</Tag>
						)
					})}
				</div>
			</Collapse>
		</>
	)
}

const TemplatesList = ({
	isLoading,
	queries,
	showAll,
	classCategoryTags,
	showAllLabel,
	handleCategoryToggle,
	classView,
	rootUrl,
}) => {
	if (isLoading) {
		return null
	}

	return (
		<div>
			<Divider css={{ margin: '10px 0' }} />
			<ShowCategories
				handleCategoryToggle={handleCategoryToggle}
				classCategoryTags={classCategoryTags}
				showAllLabel={showAllLabel}
				showAll={showAll}
			/>
			<Divider css={{ margin: 0 }} />
			<ul css={{ overflow: 'auto', listStyle: 'none', padding: 0, height: '77vh' }}>
				{queries.map((template) => (
					<li key={template.name} css={{ margin: '0.875em 0' }}>
						<TemplateQuery classView={classView} rootUrl={rootUrl} template={template} />
					</li>
				))}
			</ul>
		</div>
	)
}

const OverviewConstraintList = ({ queries, isLoading }) => {
	if (isLoading) {
		return null
	}
	return (
		<ul
			css={{
				overflow: 'auto',
				listStyle: 'none',
				padding: 0,
				height: '77vh',
			}}
		>
			{queries.map((config, idx) => (
				<li css={{ margin: '0.875em 0' }} key={idx}>
					<OverviewConstraint
						constraintConfig={config}
						color={DATA_VIZ_COLORS[idx % DATA_VIZ_COLORS.length]}
					/>
				</li>
			))}
		</ul>
	)
}

export const ConstraintSection = ({
	queries,
	isLoading,
	view,
	showAllLabel,
	classCategoryTags,
	toggleCategory,
	classView,
	rootUrl,
	showAll,
}) => {
	const isTemplateView = view === 'templateView'

	return (
		<section
			css={{
				minWidth: 230,
				borderRight: '2px solid var(--blue5)',
				backgroundColor: 'var(--solidWhite)',
			}}
		>
			<Tabs
				id="constraint-tabs"
				selectedTabId={view}
				large={true}
				onChange={(newTabId) => sendToBus({ type: CHANGE_CONSTRAINT_VIEW, newTabId })}
				css={{
					marginBottom: 10,
					[`&& .${Classes.TAB_LIST}`]: { margin: '10px 20px 0' },
				}}
			>
				<Tab id="defaultView" title="Overview" />
				<Tab id="templateView" title="Templates" />
			</Tabs>
			{isTemplateView ? (
				<TemplatesList
					isLoading={isLoading}
					queries={queries}
					showAll={showAll}
					classCategoryTags={classCategoryTags}
					showAllLabel={showAllLabel}
					handleCategoryToggle={toggleCategory}
					classView={classView}
					rootUrl={rootUrl}
				/>
			) : (
				<>
					<QueryController />
					<OverviewConstraintList queries={queries} isLoading={isLoading} />
				</>
			)}
		</section>
	)
}