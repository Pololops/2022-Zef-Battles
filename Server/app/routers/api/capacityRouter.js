import { Router } from 'express';
const router = Router();

import validate from '../../validation/validator.js';
import createSchema from '../../validation/schemas/capacityCreateSchema.js';
import updateSchema from '../../validation/schemas/capacityUpdateSchema.js';

import controllerHandler from '../../middlewares/controllerHandler.js';

import controller from '../../controllers/capacityController.js';

router
	.route('/')
	/**
	 * GET /v1/capacity
	 * @summary Get all families order by name
	 * @tags capacity
	 * @return {capacity} 200 - success response - application/json
	 */
	.get(controllerHandler(controller.getAll))
	/**
	 * POST /api/capacity
	 * @summary Create a capacity
	 * @tags capacity
	 * @param {Inputcapacity} request.body.required - capacity info
	 * @return {capacity} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 */
	.post(validate('body', createSchema), controllerHandler(controller.create));

router
	.route('/:id(\\d+)')
	/**
	 * PATCH /api/capacity/{id}
	 * @summary Update one capacity
	 * @tags capacity
	 * @param {number} id.path.required - capacity identifier
	 * @param {Inputcapacity} request.body.required - capacity info
	 * @return {capacity} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 */
	.patch(validate('body', updateSchema), controllerHandler(controller.update))
	/**
	 * DELETE /api/capacity/{id}
	 * @summary Delete one capacity
	 * @tags capacity
	 * @param {number} id.path.required - capacity identifier
	 * @return {capacity} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 */
	.delete(controllerHandler(controller.delete));

export default router;
