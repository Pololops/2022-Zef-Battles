import Debug from 'debug';
const debug = Debug('Controller:familyController:log');

import ApiError from '../errors/apiError.js';

import familyDatamapper from '../models/family.js';

const familyController = {
	async getAll(request, response) {
		const getWithCharacters = request.query.withcharacters;

		let families;
		if (getWithCharacters === 'true') {
			families = await familyDatamapper.findAllWithCharacters();
			debug('getAll with characters : ', families);
		} else {
			families = await familyDatamapper.findAll();
			debug('getAll : ', families);
		}

		return response.json(families);
	},

	async getAllWithCharacters(_, response) {
		const families = await familyDatamapper.findAllWithCharacters();

		debug('getAll with Characters : ', families);
		return response.json(families);
	},

	async create(request, response) {
		const family = await familyDatamapper.isUnique(request.body);
		if (family) {
			throw new ApiError('This family name already exists', {
				statusCode: 400,
			});
		}

		const savedFamily = await familyDatamapper.insert(request.body);

		debug('create : ', savedFamily);
		return response.json(savedFamily);
	},

	async update(request, response) {
		const id = Number(request.params.id);

		const family = await familyDatamapper.findByPk(id);
		if (!family) {
			throw new ApiError('This family does not exists', { statusCode: 404 });
		}

		if (request.body.name) {
			const existingFamily = await familyDatamapper.isUnique(request.body);
			if (existingFamily) {
				throw new ApiError('Other family already exists with this name', {
					statusCode: 400,
				});
			}
		}

		const savedFamily = await familyDatamapper.update(id, request.body);

		debug('update : ', savedFamily);
		return response.json(savedFamily);
	},

	async delete(request, response) {
		const deletedFamily = await familyDatamapper.delete(
			Number(request.params.id),
		);
		if (!deletedFamily) {
			throw new ApiError('This family does not exists', { statusCode: 404 });
		}

		debug('delete : ', deletedFamily);
		return response.status(204).json();
	},
};

export default familyController;
