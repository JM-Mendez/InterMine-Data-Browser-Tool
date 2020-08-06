import axios from 'axios'
import { saveAs } from 'file-saver'
import imjs from 'imjs'

import { formatConstraintPath } from './utils'

const serviceCache = {}

const getService = (rootUrl) => {
	let service = serviceCache[rootUrl]
	if (!service) {
		service = new imjs.Service({ root: rootUrl })
		serviceCache[rootUrl] = service
	}

	return service
}

export const INTERMINE_REGISTRY = 'https://registry.intermine.org/service/instances'

export const fetchSummary = async ({ rootUrl, query, path }) => {
	const service = getService(rootUrl)
	const q = new imjs.Query(query, service)

	let fullPath
	try {
		fullPath = formatConstraintPath({ classView: query.from, path })

		// make sure the path exists
		await service.makePath(fullPath)
	} catch (e) {
		const err = new Error()
		err.message = `The mine at ${rootUrl} does not contain the path ${fullPath}`

		throw err
	}

	return await q.summarize(fullPath)
}

export const fetchTable = async ({ rootUrl, query, page }) => {
	const service = getService(rootUrl)
	const summary = await service.tableRows(query, page)
	const totalRows = await service.count(query)

	return {
		summary,
		totalRows,
	}
}

export const fetchTemplates = async ({ rootUrl }) => {
	const service = getService(rootUrl)

	return await service.fetchTemplates()
}

export const fetchInstances = async (registry) => {
	return axios.get(registry, {
		params: {
			mine: 'prod',
		},
	})
}

export const fetchClasses = async (rootUrl) => {
	const service = getService(rootUrl)

	return await service.fetchModel()
}

export const fetchPathValues = async ({ path, rootUrl }) => {
	const service = getService(rootUrl)

	return await service.pathValues(path)
}

export const fetchLists = async (rootUrl) => {
	const service = getService(rootUrl)

	return await service.fetchLists()
}

export const exportTable = async ({ query, rootUrl, format, fileName }) => {
	const service = getService(rootUrl)
	const q = await service.query(query)

	const file = await service.post('query/results', { format, query: q.toXML() })
	const blob = new Blob([file])

	saveAs(blob, `${fileName}.${format}`)
}

export const fetchCode1 = async ({ query, lang, rootUrl, fileName }) => {
	const service = getService(rootUrl)
	const q = await service.query(query)

	return await q.fetchCode(lang)
}

export const fetchCode = async ({ query, lang, rootUrl, codeCache }) => {
	if (!query || Object.keys(query).length === 0) {
		return
	}

	if (!(lang in codeCache)) {
		const service = getService(rootUrl)
		const q = await service.query(query)

		return await q.fetchCode(lang)
	}
}
