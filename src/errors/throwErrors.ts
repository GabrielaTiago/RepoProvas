import { ErrorsTypes } from '../types/serverErrorTypes';

export function throwCustomError(type: ErrorsTypes, err_message: string | string[]): object {
    throw { type, err_message };
}