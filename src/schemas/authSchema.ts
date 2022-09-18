import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi
        .string()
        .trim()
        .regex(/^([`~!@#$%^&*()_\-+={}[\]\\\|:;"'<>,\.\?\/a-zA-Z0-9]{8,20})$/)
        .required(),
    confirmPassword: joi.string().trim().min(8).required(),
});

export const signInSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required(),
});
