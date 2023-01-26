import ApiError from '../errors/apiError.js'
import familyDatamapper from '../models/family.js'
import characterDatamapper from '../models/character.js'

export const adminAccessMiddleware = async (request, _response, next) => {
	if (request.connectedUser.role !== 'admin') {
		throw new ApiError('Forbidden: you do not have permissions', {
			statusCode: 403,
		})
	}

	next()
}

export const adminOrUserAccessMiddleware = async (request, _response, next) => {
	const { id, role } = request.connectedUser
	const userId = parseInt(request.params.userId)

	if (role !== 'admin' && id !== userId) {
		throw new ApiError('Forbidden: you do not have permissions', {
			statusCode: 403,
		})
	}

	next()
}

export const authorizeAccessMiddleware = async (request, _response, next) => {
	const { role, id } = request.connectedUser
	let { familyId, characterId } = request.params

	if (characterId) {
		const foundCharacter = await characterDatamapper.findByPk(characterId)
		if (!foundCharacter) {
			throw new ApiError('This character does not exists', { statusCode: 404 })
		}
		familyId = foundCharacter.family_id
	}

	const foundCharacterFamily = await familyDatamapper.findByPk(familyId)
	if (!foundCharacterFamily) {
		throw new ApiError('This family does not exists', { statusCode: 404 })
	}

	if (foundCharacterFamily.user_id !== id && role !== 'admin') {
		throw new ApiError('Forbidden: You do not have permissions', {
			statusCode: 403,
		})
	}

	next()
}
