import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import authRouter from './authRouter';
import testsRouter from './testsRoutes';
import swaggerDocs from '../../swagger.json';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const router = Router();

router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router.use(authRouter);
router.use(validateToken);
router.use(testsRouter);

export default router;
