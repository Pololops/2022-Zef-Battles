import Debug from 'debug';
const debug = Debug('Controller:familyController:log');

import ApiError from '../errors/apiError.js';

import familyDatamapper from '../models/family.js';

const regexp = new RegExp(
	/^([A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*){1}([- ']{1}[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*)*$/,
);

const familyController = {
	async getAll(_, response) {
		const families = await familyDatamapper.findAll();
		return response.json(families);
	},

	async create(request, response) {
		const newFamily = request.body;

		if (!regexp.test(newFamily.name)) {
			throw new ApiError(
				'Each word of the family name has to begin with a capital letter',
				{ statusCode: 400 },
			);
		}

		const family = await familyDatamapper.isUnique(newFamily);
		if (family) {
			throw new ApiError('This family name already exists', {
				statusCode: 400,
			});
		}

    const saveFamily = await familyDatamapper.insert(newFamily);
    return response.json(saveFamily);
	},
};

export default familyController;
