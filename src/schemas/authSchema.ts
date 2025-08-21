import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().trim().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email can not be empty',
        'any.required': 'Email is required',
    }),
    password: joi
        .string()
        .trim()
        .regex(/^([`~!@#$%^&*()_\-+={}[\]:;"'<>,.?/a-zA-Z0-9]{8,20})$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be between 8 and 20 characters, with at least one letter, one number and one special character',
            'string.empty': 'Password can not be empty',
            'any.required': 'Password is required',
        }),
    confirmPassword: joi.string().trim().valid(joi.ref('password')).required().messages({
        'string.empty': 'Confirm password can not be empty',
        'any.required': 'Confirm password is required',
        'any.only': 'Confirm password must match password',
    }),
});

export const signInSchema = joi.object({
    email: joi.string().trim().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email can not be empty',
        'any.required': 'Email is required',
    }),
    password: joi.string().trim().min(8).required().messages({
        'string.empty': 'Password can not be empty',
        'any.required': 'Password is required',
    }),
});
