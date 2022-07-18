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

	async update(request, response) {
		const family = await familyDatamapper.findByPk(Number(request.params.id));
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

		const savedFamily = await familyDatamapper.update(
			request.params.id,
			request.body,
		);
		return response.json(savedFamily);
	},

	async delete(request, response) {
		const deletedFamily = await familyDatamapper.delete(request.params.id);
		if (!deletedFamily) {
			throw new ApiError('This family does not exists', { statusCode: 404 });
		}

		return response.status(204).json();
	},
};

export default familyController;
