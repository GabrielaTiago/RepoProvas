import { Router } from 'express';
import { validatetoken } from '../middlewares/validateTokenMiddleware';
import authRouter from './authRouter';
import testsRouter from './testsRoutes';

const router = Router();

router.use(authRouter);
router.use(validatetoken);
router.use(testsRouter);

export default router;
