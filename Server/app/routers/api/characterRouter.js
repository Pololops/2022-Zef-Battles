import { Router } from 'express';
const router = Router();

import sanitize from '../../middlewares/sanitizerHandler.js';
import validate from '../../validation/validator.js';
import createSchema from '../../validation/schemas/characterCreateSchema.js';
import updateSchema from '../../validation/schemas/characterUpdateSchema.js';

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
	 * @return {Character} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character not found - application/json
	 */
	.delete(controllerHandler(controller.delete));

router
	.route('/family/:familyId(\\d+)')
	/**
	 * GET /api/family/{familyId}/character
	 * @summary Get all families order by name
	 * @tags Character
	 * @param {number} familyId.path.required - character identifier
	 * @return {Character} 200 - success response - application/json
	 */
	.get(controllerHandler(controller.getAllInFamily))
	/**
	 * POST /api/family/{familyId}/character
	 * @summary Create a character
	 * @tags Character
	 * @param {number} familyId.path.required - character identifier
	 * @param {InputCharacter} request.body.required - character info
	 * @return {Character} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character not found - application/json
	 */
	.post(
		sanitize('body'),
		validate('body', createSchema),
		controllerHandler(controller.createInFamily),
	);

export default router;
