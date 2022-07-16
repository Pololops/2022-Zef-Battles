import { Router } from 'express';
const router = Router();

import familyController from '../controllers/familyController.js';

router
	.route('/family')
	/**
	 * GET /v1/family
	 * @summary Get all families order by name
	 * @tags FAMILY
	 * @return {Family} 200 - success response - application/json
	 */
	.get(familyController.getAllFamily);

export default router;
