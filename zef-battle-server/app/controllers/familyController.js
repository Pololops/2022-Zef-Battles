import Debug from 'debug'
const debug = Debug('Controller:familyController:log')

import familyDatamapper from '../models/family.js'
import ApiError from '../errors/apiError.js'

export default {
	getAll: async (request, response) => {
		const { withcharacters } = request.query

		let families
		if (withcharacters === 'true') {
			families = await familyDatamapper.findAllWithCharacters()
			debug('getAll with characters : ', families)
		} else {
			families = await familyDatamapper.findAll()
			debug('getAll : ', families)
		}

		return response.status(200).json(families)
	},

	getOneByPk: async (request, response) => {
		const id = parseInt(request.params.familyId)
		const family = await familyDatamapper.findByPkWithCharacters(id)

		if (!family)
			throw new ApiError('This family does not exist', { statusCode: 404 })

		debug('getOneByPk : ', family)
		return response.status(200).json(family)
	},

	create: async (request, response) => {
		const family = await familyDatamapper.isUnique(request.body)
		const connectedUserId = request.connectedUser.id

		if (family)
			throw new ApiError('This family name already exists', { statusCode: 400 })

		const savedFamily = await familyDatamapper.insert({
			name: request.body.name,
			userId: connectedUserId,
		})

		debug('create : ', savedFamily)
		return response.status(200).json(savedFamily)
	},

	update: async (request, response) => {
		const id = parseInt(request.params.familyId)
		
		if (request.body.name) {
			const existingFamily = await familyDatamapper.isUnique(request.body)
			if (existingFamily && existingFamily.id !== id) {
				throw new ApiError('Other family already exists with this name', {
					statusCode: 400,
				})
			}
		}

		const savedFamily = await familyDatamapper.update(id, request.body)

		debug('update : ', savedFamily)
		return response.status(200).json(savedFamily)
	},

	delete: async (request, response) => {
		const id = parseInt(request.params.familyId)

		const family = await familyDatamapper.findByPk(id)
		if (!family) {
			throw new ApiError('This family does not exists', { statusCode: 404 })
		}

		const deletedFamily = await familyDatamapper.delete(id)

		debug('delete : ', deletedFamily)
		return response.status(204).json()
	},
}
