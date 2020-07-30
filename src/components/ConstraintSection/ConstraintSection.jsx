import { Button, Classes, Collapse, Divider, Tab, Tabs, Tag, Text } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useState } from 'react'
import { CHANGE_CONSTRAINT_VIEW, REMOVE_LIST_CONSTRAINT, REMOVE_LIST_TAG } from 'src/eventConstants'
import { sendToBus, useMachineBus } from 'src/useMachineBus'

import { DATA_VIZ_COLORS } from '../dataVizColors'
import { OverviewConstraint } from '../Overview/OverviewConstraint'
import { QueryController } from '../QueryController/QueryController'
import { TemplateQuery } from '../Templates/TemplateQuery'
import { constraintSectionMachine } from './constraintSectionMachine'

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
			<Collapse isOpen={showCategories} css={{ marginTop: 0 }}>
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

const ShowLists = ({ listNames }) => {
	const [showLists, setShowLists] = useState(false)

	const selectedLists = listNames.map((listName) => {
		return (
			<Tag
				key={listName}
				intent="primary"
				interactive={true}
				onRemove={() => {
					// @ts-ignore
					sendToBus({ type: REMOVE_LIST_CONSTRAINT, listName })
					// @ts-ignore
					sendToBus({ type: REMOVE_LIST_TAG, listName })
				}}
				css={{ margin: 4 }}
			>
				{listName}
			</Tag>
		)
	})

	return (
		<>
			<Button
				icon={showLists ? IconNames.CARET_DOWN : IconNames.CARET_RIGHT}
				fill={true}
				alignText="left"
				text="List Filters"
				minimal={true}
				large={true}
				onClick={() => setShowLists(!showLists)}
			/>
			<Collapse isOpen={showLists} css={{ marginTop: 0 }}>
				<div css={{ backgroundColor: 'var(--blue0)', padding: 10 }}>
					{listNames.length > 0 ? (
						selectedLists
					) : (
						<Text css={{ marginLeft: 20 }}>No Lists Selected</Text>
					)}
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
	listNames,
}) => {
	if (isLoading) {
		return null
	}

	return (
		<div>
			<Divider css={{ margin: 0 }} />
			<ShowLists listNames={listNames} />
			<Divider css={{ margin: 0 }} />
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
	const [state] = useMachineBus(constraintSectionMachine)

	const isTemplateView = view === 'templateView'
	const { listNames } = state.context

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
					listNames={listNames}
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