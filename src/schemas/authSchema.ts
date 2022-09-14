import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi
        .string()
        .trim()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
        .required(),
});

export const signInSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required(),
});
