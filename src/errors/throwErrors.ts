import { ErrorsTypes } from '../types/serverErrorTypes';

export function throwCustomError(type: ErrorsTypes, message: string | string[]): object {
    throw { type, message };
}