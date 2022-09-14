import { signInSchema, signUpSchema } from "./authSchema";


export const schemas = {
    "login": signInSchema,
    "register": signUpSchema
}