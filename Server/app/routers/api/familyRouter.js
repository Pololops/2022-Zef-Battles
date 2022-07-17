import { Router } from 'express';
const router = Router();

import controllerHandler from '../../middlewares/controllerHandler.js';
import familyController from '../../controllers/familyController.js';

router
	.route('/')
	/**
	 * GET /v1/family
	 * @summary Get all families order by name
	 * @tags FAMILY
	 * @return {Family} 200 - success response - application/json
	 */
	.get(controllerHandler(familyController.getAll));

export default router;
