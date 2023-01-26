import { Router } from 'express';
const router = Router();

import { tokenVerifier } from '../../middlewares/tokenManager.js'
import { adminAccessMiddleware } from '../../middlewares/userAccessVerifier.js'
import sanitize from '../../middlewares/sanitizerHandler.js'
import validate from '../../validation/validator.js'
import { createSchema, updateSchema } from '../../validation/schemas/capacitySchema.js'

import controllerHandler from '../../middlewares/controllerHandler.js'

import controller from '../../controllers/capacityController.js'

router
	.route('/')

	/**
	 * GET /api/capacity
	 * @summary Get all capacities order by name
	 * @tags Capacity
	 * @return {array<Capacity>} 200 - success response - application/json
	 */
	.get(controllerHandler(controller.getAll))

	/**
	 * POST /api/capacity
	 * @summary Create a capacity
	 * @tags Capacity
	 * @param {InputCapacity} request.body.required - capacity info
	 * @return {Capacity} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 * @example request - example payload
	 * {
	 *		"name": "Magie",
	 * 		"description": "La magie est l'art d'utiliser les potions."
	 * }
	 * @example request - other payload example
	 * {
	 *		"name": "Sagesse",
	 * 		"description": "La sagesse s'acquiert avec l'age."
	 * }
	 */
	.post(
		controllerHandler(tokenVerifier),
		controllerHandler(adminAccessMiddleware),
		sanitize('body'),
		validate('body', createSchema),
		controllerHandler(controller.create),
	)

router
	.route('/:capacityId(\\d+)')

	/**
	 * PATCH /api/capacity/{capacityId}
	 * @summary Update one capacity
	 * @tags Capacity
	 * @param {number} capacityId.path.required - capacity identifier
	 * @param {InputCapacity} request.body.required - capacity info
	 * @return {Capacity} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 * @example request - example payload
	 * {
	 *		"name": "Magie",
	 * 		"description": "La magie est l'art d'utiliser les potions."
	 * }
	 * @example request - other payload example
	 * {
	 *		"name": "Sagesse",
	 * 		"description": "La sagesse s'acquiert avec l'age."
	 * }
	 */
	.patch(
		controllerHandler(tokenVerifier),
		controllerHandler(adminAccessMiddleware),
		sanitize('body'),
		validate('body', updateSchema),
		controllerHandler(controller.update),
	)

	/**
	 * DELETE /api/capacity/{capacityId}
	 * @summary Delete one capacity
	 * @tags Capacity
	 * @param {number} capacityId.path.required - capacity identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 */
	.delete(
		controllerHandler(tokenVerifier),
		controllerHandler(adminAccessMiddleware),
		controllerHandler(controller.delete),
	)

export default router;
