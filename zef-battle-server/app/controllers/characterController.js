import Debug from 'debug';
const debug = Debug('Controller:characterController:log');

import ApiError from '../errors/apiError.js';

import characterDatamapper from '../models/character.js';
import capacityDatamapper from '../models/capacity.js';

const characterController = {
	async getAllInFamily(request, response) {
		const familyId = ParseInt(request.params.id);

		const characters = await characterDatamapper.findAllInFamily(familyId);

		debug('getAllInFamily : ', characters);
		return response.json(characters);
	},

	async getOneByPk(request, response) {
		const characterId = ParseInt(request.params.id);

		const character = await characterDatamapper.findByPk(characterId);

		debug('getOneByPk : ', character);
		return response.json(character);
	},

	async createInFamily(request, response) {
		const paramsFamilyId = ParseInt(request.params.id);
		const bodyFamilyId = ParseInt(request.body.family_id);

		if (paramsFamilyId !== bodyFamilyId) {
			throw new ApiError(
				'This character is not create in the right family, change family to create it.',
				{
					statusCode: 400,
				},
			);
		}

		const character = await characterDatamapper.isUnique(request.body);
		if (character) {
			throw new ApiError('This character already exists', {
				statusCode: 400,
			});
		}

		const uploadsFolder = process.env.UPLOADS_PATH ?? '/uploads/';

		const savedCharacter = await characterDatamapper.insertInFamily(
			{ ...request.body, picture: uploadsFolder + request.file.filename },
			bodyFamilyId,
		);

		debug('createInFamily : ', savedCharacter);
		return response.json(savedCharacter);
	},

	async update(request, response) {
		const id = ParseInt(request.params.id);

		const character = await characterDatamapper.findByPk(id);
		if (!character) {
			throw new ApiError('This character does not exists', { statusCode: 404 });
		}

		if ((request.body.name, id)) {
			const existingCharacter = await characterDatamapper.isUnique(
				request.body,
			);
			if (existingCharacter) {
				throw new ApiError('Other character already exists with this name', {
					statusCode: 400,
				});
			}
		}

		const savedCharacter = await characterDatamapper.update(id, request.body);

		debug('update : ', savedCharacter);
		return response.json(savedCharacter);
	},

	async delete(request, response) {
		const deletedCharacter = await characterDatamapper.delete(
			ParseInt(request.params.id),
		);
		if (!deletedCharacter) {
			throw new ApiError('This character does not exists', { statusCode: 404 });
		}

		debug('delete : ', deletedCharacter);
		return response.status(204).json();
	},

	async addCapacityToCharacter(request, response) {
		const characterId = parseInt(request.params.id);
		const capacity = request.body;

		const foundCharacter = await characterDatamapper.findByPk(characterId);
		if (!foundCharacter) {
			throw new ApiError('This character does not exists', { statusCode: 404 });
		}

		let foundCapacity = null;
		if (capacity.id) {
			foundCapacity = await capacityDatamapper.findByPk(capacity.id);
		} else if (capacity.name) {
			foundCapacity = await capacityDatamapper.findByName(capacity.name);
		}

		if (foundCapacity) {
			const hasAlreadyThisCapacity = await characterDatamapper.hasCapacity(
				characterId,
				foundCapacity.id,
			);

			if (hasAlreadyThisCapacity) {
				throw new ApiError('This character already has this capacity', {
					statusCode: 400,
				});
			}
		} else {
			if (!capacity.name) {
				throw new ApiError('"capacity name" is required', {
					statusCode: 400,
				});
			}

			foundCapacity = await capacityDatamapper.insert({
				name: capacity.name,
				description: capacity.description ?? null
			});
		}

		await characterDatamapper.addCapacityToCharacter(
			characterId,
			foundCapacity.id,
			capacity.level ?? 0,
		);

		const character = await characterDatamapper.findByPk(characterId);
		debug('getOneByPk : ', character);
		return response.json(character);
	},
};

export default characterController;
