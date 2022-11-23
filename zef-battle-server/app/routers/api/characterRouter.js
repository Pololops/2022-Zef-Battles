import { Router } from 'express';
const router = Router();

import sanitize from '../../middlewares/sanitizerHandler.js';
import validate from '../../validation/validator.js';
import updateSchema from '../../validation/schemas/characterUpdateSchema.js';
import characterCapacityAssociateSchema from '../../validation/schemas/characterCapacityAssociateSchema.js';

import controllerHandler from '../../middlewares/controllerHandler.js';

import controller from '../../controllers/characterController.js';

router
	.route('/:id(\\d+)')

	/**
	 * GET /api/character/{id}
	 * @summary Get one character by its id
	 * @tags Character
	 * @param {number} id.path.required - character identifier
	 * @return {Character} 200 - success response - application/json
	 */
	.get(controllerHandler(controller.getOneByPk))

	/**
	 * PATCH /api/character/{id}
	 * @summary Update one character
	 * @tags Character
	 * @param {number} id.path.required - character identifier
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
	.patch(
		sanitize('body'),
		validate('body', updateSchema),
		controllerHandler(controller.update),
	)

	/**
	 * DELETE /api/character/{id}
	 * @summary Delete one character
	 * @tags Character
	 * @param {number} id.path.required - character identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character not found - application/json
	 */
	.delete(controllerHandler(controller.delete));

router
	.route('/:id(\\d+)/capacity')

	/**
	 * POST /api/character/{id}/capacity
	 * @summary Add one capacity to a character
	 * @tags Capacity
	 * @param {number} id.path.required - character identifier
	 * @param {AssociateCapacityToCharacter} request.body.required - capacity info
	 * @return {Character} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character or capacity not found - application/json
	 * @example request - example payload
	 * {
	 * 		"id": 1,
	 *		"name": "Sorcellerie",
	 *		"description": "Préparation de potions magiques",
	 *		"level": 50
	 * }
	 * @example request - other payload example
	 * {
	 * 		"id": 2,
	 *		"name": "Force",
	 * 		"description": "Plein de muscles",
	 *		"level": 80
	 * }
	 */
	.post(
		validate('body', characterCapacityAssociateSchema),
		controllerHandler(controller.addCapacityToCharacter),
	);

router
	.route('/:id(\\d+)/capacity/:capacityId(\\d+)')

	/**
	 * POST /api/character/{characterId}/capacity/{capacityId}
	 * @summary Remove a capacity to a character
	 * @tags Capacity
	 * @param {number} id.path.required - character identifier
	 * @param {number} capacityId.path.required - capacity identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character or capacity not found - application/json
	 */
	.delete(controllerHandler(controller.removeCapacityToCharacter));

export default router;
