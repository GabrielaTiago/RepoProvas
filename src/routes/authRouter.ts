import { Router } from 'express';

const authRouter = Router();

authRouter.post('/');
authRouter.post('/sign-up');

export default authRouter;
