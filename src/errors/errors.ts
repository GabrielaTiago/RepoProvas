export interface ICustomError extends Error {
    type: ServerErrorsType;
    message: string;
}

export const SERVER_ERRORS = {
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    conflict: 409,
    unprocessable_entity: 422,
    internal_server_error: 500,
};

export type ServerErrorsType = keyof typeof SERVER_ERRORS;
