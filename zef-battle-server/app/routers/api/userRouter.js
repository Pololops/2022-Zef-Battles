import { Router } from 'express'
const router = Router()

import sanitize from '../../middlewares/sanitizerHandler.js'
import validate from '../../validation/validator.js'
import {
	createSchema,
	updateSchema,
	loginSchema,
} from '../../validation/schemas/userSchema.js'

import { tokenVerifier } from '../../middlewares/tokenManager.js'
import controllerHandler from '../../middlewares/controllerHandler.js'
import controller from '../../controllers/userController.js'

router
	.route('/')
	/**
	 * GET /api/user
	 * @summary Get all users order by name
	 * @tags User
	 * @return {array<User>} 200 - success response - application/json
	 * @return {ApiError} 401 - Unauthorized response - application/json
	 */
	.get(controllerHandler(tokenVerifier), controllerHandler(controller.getAll))

	/**
	 * POST /api/user
	 * @summary Create a user
	 * @tags User
	 * @param {InputUser} request.body.required - user info
	 * @return {User} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @example request - example payload
	 * {
	 *		"name": "John",
	 *		"password": "password"
	 * }
	 */
	.post(
		sanitize('body'),
		validate('body', createSchema),
		controllerHandler(controller.create),
	)

router
	.route('/login')
	/**
	 * POST /api/user/login
	 * @summary log a user in
	 * @tags User
	 * @param {Login} request.body.required - user login name and password
	 * @return {User} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 */
	.post(validate('body', loginSchema), controllerHandler(controller.login))

router
	.route('/:id(\\d+)')
	/**
	 * GET /v1/user/{id}
	 * @summary Get one user by its id
	 * @tags User
	 * @security BearerAuth
	 * @param {number} id.path.required - user identifier
	 * @return {User} 200 - success response - application/json
	 * @return {ApiError} 401 - Unauthorized response - application/json
	 */
	.get(controllerHandler(tokenVerifier), controllerHandler(controller.getByPk))

	/**
	 * PATCH /v1/user/{id}
	 * @summary Update one user
	 * @tags User
	 * @security BearerAuth
	 * @param {number} id.path.required - user identifier
	 * @param {InputUser} request.body.required - user info
	 * @return {User} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 401 - Unauthorized response - application/json
	 * @return {ApiError} 404 - user not found - application/json
	 * @example request - example payload
	 * {
	 *		"name": "John",
	 *		"password": "password",
	 *		"role": "player"
	 * }
	 */
	.patch(
		controllerHandler(tokenVerifier),
		sanitize('body'),
		validate('body', updateSchema),
		controllerHandler(controller.update),
	)

	/**
	 * DELETE /api/user/{id}
	 * @summary Delete one user
	 * @tags User
	 * @param {number} id.path.required - capacity identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 401 - Unauthorized response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 */
	.delete(
		controllerHandler(tokenVerifier),
		controllerHandler(controller.delete),
	)

export default router
