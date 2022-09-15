import { ErrorsTypes } from '../types/serverErrorTypes';

export interface IServerErrors extends Error {
    type: ErrorsTypes;
    err_message: string | string[];
}
