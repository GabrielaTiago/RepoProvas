import { ISchemas } from "../interfaces/schemaInterface";
import { signInSchema, signUpSchema } from "./authSchema";


export const schemas: ISchemas = {
    "login": signInSchema,
    "register": signUpSchema
}