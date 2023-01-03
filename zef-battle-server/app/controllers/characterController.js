import Debug from 'debug'
const debug = Debug('Controller:characterController:log')

import familyDatamapper from '../models/family.js'
import characterDatamapper from '../models/character.js'
import capacityDatamapper from '../models/capacity.js'
import ApiError from '../errors/apiError.js'

import {
	saveFile,
	deleteFile,
	checkFile,
} from '../middlewares/fileUploadManager.js'

export default {
	getAllInFamily: async (request, response) => {
		const familyId = parseInt(request.params.id)

		const family = await familyDatamapper.findByPk(familyId)
		if (!family)
			throw new ApiError('This family does not exist', { statusCode: 404 })

		const characters = await characterDatamapper.findAllInFamily(familyId)

		debug('getAllInFamily : ', characters)
		return response.status(200).json(characters)
	},

	async getOneByPk(request, response) {
		const characterId = parseInt(request.params.id)

		const character = await characterDatamapper.findByPk(characterId)
		if (!character)
			throw new ApiError('This character does not exist', { statusCode: 404 })

		debug('getOneByPk : ', character)
		return response.status(200).json(character)
	},

	async createInFamily(request, response) {
		const familyId = parseInt(request.params.id)
		const { name, family_id } = request.body
		const file = request.file

		if (familyId !== parseInt(family_id)) throw new ApiError('This family does not exist', { statusCode: 400 })

		const family = await familyDatamapper.findByPk(familyId)
		if (!family)
			throw new ApiError('This family does not exist', { statusCode: 404 })

		if (!file)
			throw new ApiError('You have to upload an image file.', {
				statusCode: 400,
			})

		const character = await characterDatamapper.isUnique({ name })
		if (character)
			throw new ApiError('This character already exists', { statusCode: 400 })

		checkFile(file)

		const newFilename = name
			.toLowerCase()
			.replace(' ', '-')
			.replace(/.(?<![a-z0-9-])/g, '')
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		const extension = request.file.originalname
			.split('.')
			.reverse()[0]
			.toLowerCase()
		const formatedFilename = `${newFilename}-${uniqueSuffix}.${extension}`

		saveFile(formatedFilename, file.buffer)

		const savedCharacter = await characterDatamapper.insertInFamily({
			name,
			family_id: familyId,
			picture: formatedFilename,
		})

		debug('createInFamily : ', savedCharacter)
		return response.status(200).json(savedCharacter)
	},

	update: async (request, response) => {
		const id = parseInt(request.params.id)

		const character = await characterDatamapper.findByPk(id)
		if (!character)
			throw new ApiError('This character does not exists', { statusCode: 404 })

		if (request.body.name) {
			const existingCharacter = await characterDatamapper.isUnique(request.body)
			if (existingCharacter) {
				throw new ApiError('Other character already exists with this name', {
					statusCode: 400,
				})
			}
		}

		const savedCharacter = await characterDatamapper.update(id, request.body)

		debug('update : ', savedCharacter)
		return response.status(200).json(savedCharacter)
	},

	delete: async (request, response) => {
		const deletedCharacter = await characterDatamapper.delete(
			parseInt(request.params.id),
		)

		if (!deletedCharacter)
			throw new ApiError('This character does not exists', { statusCode: 404 })

		deleteFile(deletedCharacter.picture)

		debug('delete : ', !!deletedCharacter)
		return response.status(204).json()
	},

	async addCapacityToCharacter(request, response) {
		const characterId = parseInt(request.params.id)
		const { name, description, level } = request.body

		const foundCharacter = await characterDatamapper.findByPk(characterId)
		if (!foundCharacter)
			throw new ApiError('This character does not exists', { statusCode: 404 })

		let foundCapacity = await capacityDatamapper.findByName(name)
		if (!foundCapacity) {
			foundCapacity = await capacityDatamapper.insert({
				name,
				description,
			})
		}

		const hasAlreadyThisCapacity = await characterDatamapper.hasCapacity(
			characterId,
			foundCapacity.id,
		)
		if (hasAlreadyThisCapacity) {
			await characterDatamapper.updateAssociationBetweenCapacityAndCharacter(
				characterId,
				foundCapacity.id,
				level,
			)
		} else {
			await characterDatamapper.addAssociationBetweenCapacityAndCharacter(
				characterId,
				foundCapacity.id,
				level ?? 0,
			)
		}

		const character = await characterDatamapper.findByPk(characterId)
		debug('addCapacityToCharacter : ', character)
		return response.status(200).json(character)
	},

	removeCapacityToCharacter: async (request, response) => {
		const characterId = parseInt(request.params.id)
		const capacityId = parseInt(request.params.capacityId)

		const deletedCharacterHasCapacity =
			await characterDatamapper.removeAssociationBetweenCapacityAndCharacter(
				characterId,
				capacityId,
			)

		if (!deletedCharacterHasCapacity) {
			throw new ApiError(
				'There is no association between this character and this capacity',
				{ statusCode: 404 },
			)
		}

		const character = await characterDatamapper.findByPk(characterId)
		debug('removeCapacityToCharacter : ', character)
		return response.status(200).json(character)
	},
}
