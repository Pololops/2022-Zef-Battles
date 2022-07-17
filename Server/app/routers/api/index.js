import { Router } from 'express';

import errorHandler from '../../middlewares/errorHandler.js';

const router = Router();

import familyRouter from './familyRouter.js';

router.use('/families', familyRouter);

export default router;
