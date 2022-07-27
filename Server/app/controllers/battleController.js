import Debug from 'debug';
const debug = Debug('Controller:battleController:log');

import ApiError from '../errors/apiError.js';

import battleDatamapper from '../models/battle.js';

const battleController = {

	async getAll(request, response) {
		let userId;
		let isPlayingInBattle = false;
		if (request.query.playing) {
			// TODO : replace userId with user id include in the JWT
			userId = 2;
			if (request.query.playing === 'yes') {
				isPlayingInBattle = true;
			}
		}
		
		const battles = await battleDatamapper.findAll(userId, isPlayingInBattle);

		debug('getAll : ', battles);
		return response.json(battles);
	},

	// TODO : adapt create method to battle
	/*
	async create(request, response) {
		const savedBattle = await battleDatamapper.insert(request.body);

		debug('create : ', savedBattle);
		return response.json(savedBattle);
	},
	*/

	// TODO : adapt update method to battle
	/*
	async update(request, response) {
		const id = Number(request.params.id);

		const battle = await battleDatamapper.findByPk(id);
		if (!battle) {
			throw new ApiError('This battle does not exists', { statusCode: 404 });
		}

		if (request.body.name) {
			const existingBattle = await battleDatamapper.isUnique(request.body);
			if (existingBattle) {
				throw new ApiError('Other battle already exists with this name', {
					statusCode: 400,
				});
			}
		}

		const savedBattle = await battleDatamapper.update(id, request.body);

		debug('update : ', savedBattle);
		return response.json(savedBattle);
	},
	*/

	async delete(request, response) {
		const deletedBattle = await battleDatamapper.delete(
			Number(request.params.id),
		);
		if (!deletedBattle) {
			throw new ApiError('This battle does not exists', { statusCode: 404 });
		}

		debug('delete : ', deletedBattle);
		return response.status(204).json();
	},
};

export default battleController;
