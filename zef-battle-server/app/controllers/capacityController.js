import Debug from 'debug'
const debug = Debug('Controller:capacityController:log')

import ApiError from '../errors/apiError.js'

import capacityDatamapper from '../models/capacity.js'

export default {
	getAll: async (_request, response) => {
		const capacities = await capacityDatamapper.findAll()

		debug('getAll : ', capacities)
		return response.status(200).json(capacities)
	},

	create: async (request, response) => {
		const capacity = await capacityDatamapper.isUnique(request.body)
		if (capacity) {
			throw new ApiError('This capacity name already exists', {
				statusCode: 400,
			})
		}

		const savedCapacity = await capacityDatamapper.insert(request.body)

		debug('create : ', savedCapacity)
		return response.status(200).json(savedCapacity)
	},

	update: async (request, response) => {
		const id = parseInt(request.params.capacityId)

		const capacity = await capacityDatamapper.findByPk(id)
		if (!capacity)
			throw new ApiError('This capacity does not exists', { statusCode: 404 })

		if ((request.body.name, id)) {
			const existingCapacity = await capacityDatamapper.isUnique(request.body)
			if (existingCapacity && capacity.name !== request.body.name) {
				throw new ApiError('Other capacity already exists with this name', {
					statusCode: 400,
				})
			}
		}

		const savedCapacity = await capacityDatamapper.update(id, request.body)

		debug('update : ', savedCapacity)
		return response.status(200).json(savedCapacity)
	},

	delete: async (request, response) => {
		const id = parseInt(request.params.capacityId)
		const deletedCapacity = await capacityDatamapper.delete(id)

		if (!deletedCapacity)
			throw new ApiError('This capacity does not exists', { statusCode: 404 })

		debug('delete : ', deletedCapacity)
		return response.status(204).json()
	},
}
