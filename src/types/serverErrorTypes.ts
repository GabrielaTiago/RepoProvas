export const ERRORS = {
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    conflict: 409,
    unprocessable_entity: 422,
};

export type ErrorsTypes = keyof typeof ERRORS;
