import { NextFunction, Request, Response } from 'express';
import { schemas } from '../schemas/schemas';

export function validateShemas(schema: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schemas[schema].validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(422).send(error.details.map((err) => err.message));
        }

        return next();
    };
}