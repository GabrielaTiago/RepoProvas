import { Router } from 'express';
import { signUp } from '../controllers/authController';
import { errorHandler } from '../middlewares/errorHandlerMiddleware';
import { validateShemas } from '../middlewares/validateSchemasMiddleware';

const authRouter = Router();

authRouter.post('/');
authRouter.post('/sign-up', validateShemas('register'), errorHandler ,signUp);

export default authRouter;
