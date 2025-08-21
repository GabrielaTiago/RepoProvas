import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import authRouter from './authRouter';
import testsRouter from './testsRoutes';
import swaggerSpec from '../config/swagger';
import { validateToken } from '../middlewares/validateTokenMiddleware';


const router = Router();

router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use(authRouter);
router.use(validateToken);
router.use(testsRouter);

export default router;
