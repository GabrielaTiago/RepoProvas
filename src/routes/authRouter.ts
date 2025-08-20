import { Router } from 'express';

import { signIn, signUp } from '../controllers/authController';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { schemas } from '../schemas/schemas';

const authRouter = Router();

authRouter.post('/login', validateSchema(schemas.login), signIn);
authRouter.post('/sign-up', validateSchema(schemas.register), signUp);

export default authRouter;
