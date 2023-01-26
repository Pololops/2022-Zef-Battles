import { Router } from 'express'
const router = Router()

import { tokenVerifier } from '../../middlewares/tokenManager.js'
import { authorizeAccessMiddleware } from '../../middlewares/userAccessVerifier.js'
import sanitize from '../../middlewares/sanitizerHandler.js'
import validate from '../../validation/validator.js'
import { createSchema as characterCapacityAssociateSchema } from '../../validation/schemas/characterCapacityAssociateSchema.js'

import controllerHandler from '../../middlewares/controllerHandler.js'
import controller from '../../controllers/characterController.js'

router
	.route('/')

	/**
	 * GET /api/character
	 * @summary Get random characters
	 * @tags Character
	 * @param {number} quantity.query - quantity of characters
	 * @return {Character} 200 - success response - application/json
	 */
	.get(controllerHandler(controller.getRandom));

router
	.route('/:characterId(\\d+)')

	/**
	 * GET /api/character/{characterId}
	 * @summary Get one character by its id
	 * @tags Character
	 * @param {number} characterId.path.required - character identifier
	 * @return {Character} 200 - success response - application/json
	 */
	.get(controllerHandler(controller.getOneByPk))

	/**
	 * DELETE /api/character/{characterId}
	 * @summary Delete one character
	 * @tags Character
	 * @param {number} characterId.path.required - character identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character not found - application/json
	 */
	.delete(
		controllerHandler(tokenVerifier),
		controllerHandler(authorizeAccessMiddleware),
		controllerHandler(controller.delete),
	)

router
	.route('/:characterId(\\d+)/capacity')

	/**
	 * POST /api/character/{characterId}/capacity
	 * @summary Add one capacity to a character
	 * @tags Capacity
	 * @param {number} characterId.path.required - character identifier
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
		controllerHandler(tokenVerifier),
		controllerHandler(authorizeAccessMiddleware),
		sanitize('body'),
		validate('body', characterCapacityAssociateSchema),
		controllerHandler(controller.addCapacityToCharacter),
	)

router
	.route('/:characterId(\\d+)/capacity/:capacityId(\\d+)')

	/**
	 * DELETE /api/character/{characterId}/capacity/{capacityId}
	 * @summary Remove a capacity to a character
	 * @tags Capacity
	 * @param {number} characterId.path.required - character identifier
	 * @param {number} capacityId.path.required - capacity identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character or capacity not found - application/json
	 */
	.delete(
		controllerHandler(tokenVerifier),
		controllerHandler(authorizeAccessMiddleware),
		controllerHandler(controller.removeCapacityToCharacter),
	)

export default router
