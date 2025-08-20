import { Request, Response } from 'express';

import { ISignInData, ISignUpData } from '../interfaces/authInterfaces';
import * as authServices from '../services/authServices';

export async function signUp(req: Request, res: Response) {
    const user: ISignUpData = req.body;
    await authServices.createUser(user);
    res.status(201).send({ message: 'User created successfully' });
}

export async function signIn(req: Request, res: Response) {
    const user: ISignInData = req.body;
    const token = await authServices.login(user);
    res.status(200).send({ token, message: 'Authentication successful' });
}
