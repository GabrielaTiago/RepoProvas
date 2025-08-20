import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { throwCustomError } from '../errors/throwErrors';

dotenv.config();

export function validatetoken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw throwCustomError('unauthorized', 'Missing authorization header');
    }

    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        throw throwCustomError('unauthorized', 'Token not found');
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const validToken: any = jwt.verify(token, JWT_SECRET as string);

        res.locals.userId = validToken.id;
        next();
    } catch {
        throw throwCustomError('unauthorized', 'Invalid token');
    }
}
