import { ISchemas } from "../interfaces/schemaInterface";
import { signInSchema, signUpSchema } from "./authSchema";
import { testSchema } from "./testSchema";


export const schemas: ISchemas = {
    "login": signInSchema,
    "register": signUpSchema,
    "test": testSchema
}