import { ErrorsTypes } from '../types/serverErrorTypes';

interface CustomError extends Error {
    type: ErrorsTypes;
    message: string;
}

export function throwCustomError(type: ErrorsTypes, message: string): object {
    const error = new Error() as CustomError;
    error.type = type;
    error.message = message;
    throw error;
}
