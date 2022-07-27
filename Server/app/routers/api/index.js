import { Router } from 'express';

const router = Router();

import familyRouter from './familyRouter.js';
import capacityRouter from './capacityRouter.js';
import characterRouter from './characterRouter.js';
import battleRouter from './battleRouter.js';

router.use('/family', familyRouter);
router.use('/capacity', capacityRouter);
router.use('/character', characterRouter);

router.use('/battle', battleRouter);

export default router;
