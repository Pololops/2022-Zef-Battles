import { Router } from 'express';

import handleError from '../middlewares/handleError.js';

const router = Router();

import familyRouter from './familyRouter.js';

router.use('/v1', familyRouter);

router.use(() => {
	throw new ApiError('Endpoint not found', { statusCode: 404 });
});

router.use((err, _, response, next) => {
	handleError(err, response, next);
});

export default router;
