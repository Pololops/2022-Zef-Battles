import { Router } from 'express';

const router = Router();

import familyRouter from './familyRouter.js';
import capacityRouter from './capacityRouter.js';

router.use('/family', familyRouter);
router.use('/capacity', capacityRouter);

export default router;
