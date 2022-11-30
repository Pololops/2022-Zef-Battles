import { Router } from 'express';
const router = Router();

import ApiError from '../../errors/apiError.js';

import sanitize from '../../middlewares/sanitizerHandler.js';
import validate from '../../validation/validator.js';
import schema from '../../validation/schemas/familySchema.js';
import createCharacterSchema from '../../validation/schemas/characterCreateSchema.js';

import controllerHandler from '../../middlewares/controllerHandler.js';

import familyController from '../../controllers/familyController.js';
import characterController from '../../controllers/characterController.js';

import uploadFile from '../../middlewares/uploadFile.js';

router
	.route('/')

	/**
	 * GET /api/family
	 * @summary Get all families order by name
	 * @tags Family
	 * @param {boolean} withcharacters.query - get all characters in each family
	 * @return {array<Family>} 200 - success response - application/json
	 */
	.get(controllerHandler(familyController.getAll))

	/**
	 * POST /api/family
	 * @summary Create a family
	 * @tags Family
	 * @param {InputFamily} request.body.required - family info
	 * @return {Family} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Family not found - application/json
	 * @example request - example payload
	 * {
	 *   "name": "Minions"
	 * }
	 * @example request - other payload example
	 * {
	 *   "name": "Schtroumpfs"
	 * }
	 */
	.post(
		sanitize('body'),
		validate('body', schema),
		controllerHandler(familyController.create),
	);

router
	.route('/:id(\\d+)')

	/**
	 * PATCH /api/family/{id}
	 * @summary Update one family
	 * @tags Family
	 * @param {number} id.path.required - family identifier
	 * @param {InputFamily} request.body.required - family info
	 * @return {Family} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Family not found - application/json
	 * @example request - example payload
	 * {
	 *   "name": "Minions"
	 * }
	 * @example request - other payload example
	 * {
	 *   "name": "Schtroumpfs"
	 * }
	 */
	.patch(
		sanitize('body'),
		validate('body', schema),
		controllerHandler(familyController.update),
	)

	/**
	 * DELETE /api/family/{id}
	 * @summary Delete one family
	 * @tags Family
	 * @param {number} id.path.required - family identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Family not found - application/json
	 */
	.delete(controllerHandler(familyController.delete));

router
	.route('/:id(\\d+)/character')

	/**
	 * GET /api/family/{familyId}/character
	 * @summary Get all character of a family order by name
	 * @tags Character
	 * @param {number} familyId.path.required - character identifier
	 * @return {array<Character>} 200 - success response - application/json
	 */
	.get(controllerHandler(characterController.getAllInFamily))

	/**
	 * POST /api/family/{familyId}/character
	 * @summary Create a character
	 * @tags Character
	 * @param {number} familyId.path.required - character identifier
	 * @param {InputCharacter} request.body.required - character info
	 * @return {Character} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character not found - application/json
	 * @example request - example payload
	 * {
	 *		"name": "Schtroumpf Grognon",
	 * 		"picture": "/",
	 * 		"family_id": 2
	 * }
	 * @example request - other payload example
	 * {
	 *		"name": "Pikachu",
	 * 		"picture": "/",
	 * 		"family_id": 1
	 * }
	 */
	.post(
		controllerHandler(uploadFile),
		sanitize('body'),
		validate('body', createCharacterSchema),
		controllerHandler(characterController.createInFamily),
	);

export default router;
