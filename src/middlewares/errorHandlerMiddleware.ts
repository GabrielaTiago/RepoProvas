import { NextFunction, Request, Response } from 'express';

import { IServerErrors } from '../interfaces/serverErrorsInterface';
import { ERRORS } from '../types/serverErrorTypes';

export function errorHandler(err: IServerErrors, _req: Request, res: Response, _next: NextFunction) {
    const statusCode = ERRORS[err.type];

    if (statusCode) {
        return res.status(statusCode).send(err.err_message);
    }

    res.status(500).send(err.message);
}
