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
		const familyId = parseInt(request.params.familyId)

		const family = await familyDatamapper.findByPk(familyId)
		if (!family)
			throw new ApiError('This family does not exist', { statusCode: 404 })

		const characters = await characterDatamapper.findAllInFamily(familyId)

		debug('getAllInFamily : ', characters)
		return response.status(200).json(characters)
	},

	getRandom: async (request, response) => {
		const characters = await characterDatamapper.findRandom(
			request.query.quantity,
		)

		debug('getRandom : ', characters)
		return response.status(200).json(characters)
	},

	async getOneByPk(request, response) {
		const id = parseInt(request.params.characterId)

		const character = await characterDatamapper.findByPkWithCapacity(id)
		if (!character)
			throw new ApiError('This character does not exist', { statusCode: 404 })

		debug('getOneByPk : ', character)
		return response.status(200).json(character)
	},

	async createInFamily(request, response) {
		const familyId = parseInt(request.params.familyId)
		const { name, family_id } = request.body
		const file = request.file

		if (familyId !== parseInt(family_id)) {
			throw new ApiError('This family does not exist', { statusCode: 400 })
		}

		const family = await familyDatamapper.findByPk(familyId)
		if (!family) {
			throw new ApiError('This family does not exist', { statusCode: 404 })
		}

		if (!file) {
			throw new ApiError('You have to upload an image file.', {
				statusCode: 400,
			})
		}

		const character = await characterDatamapper.isUnique({ name })
		if (character) {
			throw new ApiError('This character already exists', { statusCode: 400 })
		}

		checkFile(file)

		const newFilename = name
			.toLowerCase()
			.replace(' ', '-')
			.replace(/.(?<![a-z0-9-])/g, '')
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		const extension = file.originalname.split('.').reverse()[0].toLowerCase()
		const formatedFilename = `${newFilename}-${uniqueSuffix}.${extension}`

		saveFile(formatedFilename, file.buffer)

		const savedCharacter = await characterDatamapper.insert({
			name,
			family_id: familyId,
			picture: formatedFilename,
		})

		debug('createInFamily : ', savedCharacter)
		return response.status(200).json(savedCharacter)
	},

	delete: async (request, response) => {
		const id = parseInt(request.params.characterId)

		const deletedCharacter = await characterDatamapper.delete(id)
		if (!deletedCharacter) {
			throw new ApiError('This character does not exists', { statusCode: 404 })
		}
		deleteFile(deletedCharacter.picture)

		debug('delete : ', !!deletedCharacter)
		return response.status(204).json()
	},

	async addCapacityToCharacter(request, response) {
		const characterId = parseInt(request.params.characterId)
		const { name, description, level } = request.body

		const foundCharacter = await characterDatamapper.findByPk(characterId)
		if (!foundCharacter) {
			throw new ApiError('This character does not exists', { statusCode: 404 })
		}

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

		const character = await characterDatamapper.findByPkWithCapacity(
			characterId,
		)
		debug('addCapacityToCharacter : ', character)
		return response.status(200).json(character)
	},

	removeCapacityToCharacter: async (request, response) => {
		const characterId = parseInt(request.params.characterId)
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

		const character = await characterDatamapper.findByPkWithCapacity(
			characterId,
		)
		debug('removeCapacityToCharacter : ', character)
		return response.status(200).json(character)
	},
}
