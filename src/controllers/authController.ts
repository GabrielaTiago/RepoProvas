import { Request, Response } from 'express';

import * as authInterface from '../interfaces/authIntefaces';
import * as authServices from '../services/authServices';

export async function signUp(req: Request, res: Response) {
    const user: authInterface.ISignUpData = req.body;

    await authServices.createUser(user);
    
    res.status(201).send('Successfully created user');
}

export function signIn(req: Request, res: Response) {
    const user: authInterface.ISignInData = req.body;

    res.status(200).send();
}
