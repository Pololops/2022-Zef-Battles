import { Router } from 'express'
const router = Router()

import { tokenVerifier } from '../../middlewares/tokenManager.js'
import sanitize from '../../middlewares/sanitizerHandler.js'
import validate from '../../validation/validator.js'
import { createSchema } from '../../validation/schemas/battleSchema.js'

import controllerHandler from '../../middlewares/controllerHandler.js'
import controller from '../../controllers/battleController.js'

router
	.route('/')

	/**
	 * GET /api/battle
	 * @summary Get all battles order by date with players
	 * @tags Battle
	 * @param {boolean} playing.query - query string to filter battles in function of if the connected user is playing them
	 * @return {array<Battle>} 200 - success response - application/json
	 */
	.get(controllerHandler(tokenVerifier), controllerHandler(controller.getAll))

	// TODO : adapt POST route to battle
	/**
	 * POST /api/battle
	 * @summary Create a battle
	 * @tags Battle
	 * @param {InputBattle} request.body.required - battle info
	 * @return {Battle} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Battle not found - application/json
	 * @example request - example payload
	 * {
	 *   "start_date": "Minions"
	 * }
	 * @example request - other payload example
	 * {
	 *   "name": "Schtroumpfs"
	 * }
	 */
	.post(
		controllerHandler(tokenVerifier),
		sanitize('body'),
		validate('body', createSchema),
		controllerHandler(controller.create),
	)

router
	.route('/:battleId(\\d+)')

	// TODO : adapt PATCH route to battle
	/**
	 * PATCH /api/battle/{battleId}
	 * @summary Update one battle
	 * @tags Battle
	 * @param {number} battleId.path.required - battle identifier
	 * @param {InputBattle} request.body.required - battle info
	 * @return {Battle} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Battle not found - application/json
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
		controllerHandler(tokenVerifier),
		sanitize('body'),
		validate('body', createSchema),
		controllerHandler(controller.update),
	)

	/**
	 * DELETE /api/battle/{battleId}
	 * @summary Delete one battle
	 * @tags Battle
	 * @param {number} battleId.path.required - battle identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Battle not found - application/json
	 */
	.delete(
		controllerHandler(tokenVerifier),
		controllerHandler(controller.delete),
	)

export default router
