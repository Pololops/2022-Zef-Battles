import Debug from 'debug';
const debug = Debug('Controller:characterController:log');

import ApiError from '../errors/apiError.js';

import characterDatamapper from '../models/character.js';

const characterController = {
	async getAllInFamily(request, response) {
		const familyId = Number(request.params.id);

		const characters = await characterDatamapper.findAllInFamily(familyId);

		debug('getAllInFamily : ', characters);
		return response.json(characters);
	},

	async getOneByPk(request, response) {
		const characterId = Number(request.params.id);

		const character = await characterDatamapper.findByPk(characterId);

		debug('getOneByPOk : ', character);
		return response.json(character);
	},

	async createInFamily(request, response) {
		debug('BODY : ', request.body);
		debug('FILES : ', request.file);

		const paramsFamilyId = Number(request.params.id);
		const bodyFamilyId = Number(request.body.family_id);

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
		const id = Number(request.params.id);

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
			Number(request.params.id),
		);
		if (!deletedCharacter) {
			throw new ApiError('This character does not exists', { statusCode: 404 });
		}

		debug('delete : ', deletedCharacter);
		return response.status(204).json();
	},
};

export default characterController;
