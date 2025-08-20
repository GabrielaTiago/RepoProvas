import { Router } from 'express';

import authRouter from './authRouter';
import testsRouter from './testsRoutes';
import { validatetoken } from '../middlewares/validateTokenMiddleware';

const router = Router();

router.use(authRouter);
router.use(validatetoken);
router.use(testsRouter);

export default router;
