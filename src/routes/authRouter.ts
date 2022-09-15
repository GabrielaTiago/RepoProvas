import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController';
import { errorHandler } from '../middlewares/errorHandlerMiddleware';
import { validateShemas } from '../middlewares/validateSchemasMiddleware';

const authRouter = Router();

authRouter.post('/', validateShemas('login'), errorHandler, signIn);
authRouter.post('/sign-up', validateShemas('register'), errorHandler, signUp);

export default authRouter;
