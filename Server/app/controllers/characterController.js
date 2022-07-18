import Debug from 'debug';
const debug = Debug('Controller:characterController:log');

import ApiError from '../errors/apiError.js';

import characterDatamapper from '../models/character.js';

const characterController = {
	async getAllInFamily(request, response) {
		console.log(request.params.familyId);
		const familyId = Number(request.params.familyId);

		const characters = await characterDatamapper.findAllInFamily(familyId);

		debug('getAllInFamily : ', characters);
		return response.json(characters);
	},

	async createInFamily(request, response) {
		const paramsFamilyId = Number(request.params.familyId);
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

		const savedCharacter = await characterDatamapper.insertInFamily(
			request.body,
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
