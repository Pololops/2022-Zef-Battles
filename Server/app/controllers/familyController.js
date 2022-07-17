import Debug from 'debug';
const debug = Debug('Controller:familyController:log');

import ApiError from '../errors/apiError.js';

import familyDatamapper from '../models/family.js';

const familyController = {
	async getAll(_, response) {
		const families = await familyDatamapper.findAll();
		return response.json(families);
	},

	async create(request, response) {
		const family = await familyDatamapper.isUnique(request.body);
		if (family) {
			throw new ApiError('This family name already exists', {
				statusCode: 400,
			});
		}

		const saveFamily = await familyDatamapper.insert(request.body);
		return response.json(saveFamily);
	},

	async update(request, response) {},

	async delete(request, response) {},
};

export default familyController;
