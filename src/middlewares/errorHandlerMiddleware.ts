import { NextFunction, Request, Response } from 'express';

import { ICustomError, SERVER_ERRORS } from '../errors/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: ICustomError, _req: Request, res: Response, _next: NextFunction) {
    const { type, message } = err;
    const statusCode = SERVER_ERRORS[type];

    if (statusCode) return res.status(statusCode).send({ message });

    return res.status(SERVER_ERRORS.internal_server_error).send(err.message);
}
