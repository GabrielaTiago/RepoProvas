import { type Request, type Response, type NextFunction } from 'express';
import { type ObjectSchema } from 'joi';

import { throwCustomError } from '../errors/throwCustomError';

export function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;

        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map((err) => err.message).join(', ');
            throw throwCustomError('unprocessable_entity', errorMessages);
        }

        next();
    };
}
