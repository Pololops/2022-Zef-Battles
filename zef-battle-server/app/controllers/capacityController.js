import Debug from 'debug';
const debug = Debug('Controller:capacityController:log');

import ApiError from '../errors/apiError.js';

import capacityDatamapper from '../models/capacity.js';

const capacityController = {
	async getAll(_, response) {
		const capacities = await capacityDatamapper.findAll();

		debug('getAll : ', capacities);
		return response.json(capacities);
	},

	async create(request, response) {
		const capacity = await capacityDatamapper.isUnique(request.body);
		if (capacity) {
			throw new ApiError('This capacity name already exists', {
				statusCode: 400,
			});
		}

		const savedCapacity = await capacityDatamapper.insert(request.body);

		debug('create : ', savedCapacity);
		return response.json(savedCapacity);
	},

	async update(request, response) {
		const id = Number(request.params.id);

		const capacity = await capacityDatamapper.findByPk(id);
		if (!capacity) {
			throw new ApiError('This capacity does not exists', { statusCode: 404 });
		}

		if (request.body.name, id) {
			const existingCapacity = await capacityDatamapper.isUnique(request.body);
			if (existingCapacity) {
				throw new ApiError('Other capacity already exists with this name', {
					statusCode: 400,
				});
			}
		}

		const savedCapacity = await capacityDatamapper.update(
			id,
			request.body,
		);

		debug('update : ', savedCapacity);
		return response.json(savedCapacity);
	},

	async delete(request, response) {
		const deletedCapacity = await capacityDatamapper.delete(Number(request.params.id));
		if (!deletedCapacity) {
			throw new ApiError('This capacity does not exists', { statusCode: 404 });
		}

		debug('delete : ', deletedCapacity);
		return response.status(204).json();
	},
};

export default capacityController;
