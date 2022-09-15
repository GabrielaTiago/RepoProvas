import { Request, Response } from 'express';

export function signUp(req: Request, res: Response) {
    const user = req.body;

    res.status(201).send('Successfully created user');
}

export function signIn(req: Request, res: Response) {
    const user = req.body;

    res.status(200).send();
}