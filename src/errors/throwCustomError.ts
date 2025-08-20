import { ICustomError, ServerErrorsType } from './errors';

export function throwCustomError(type: ServerErrorsType, message: string): object {
    const error = new Error() as ICustomError;
    error.type = type;
    error.message = message;
    throw error;
}
