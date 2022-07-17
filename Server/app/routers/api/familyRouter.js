import { Router } from 'express';
const router = Router();

import controllerHandler from '../../middlewares/controllerHandler.js';
import familyController from '../../controllers/familyController.js';

router
	.route('/')
	/**
	 * GET /v1/family
	 * @summary Get all families order by name
	 * @tags Family
	 * @return {Family} 200 - success response - application/json
	 */
	.get(controllerHandler(familyController.getAll))
	/**
	 * POST /api/family
	 * @summary Create a family
	 * @tags Family
	 * @param {InputFamily} request.body.required - category info
	 * @return {Family} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Category not found - application/json
	 */
	.post(controllerHandler(familyController.create));

export default router;
