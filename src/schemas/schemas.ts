import { signInSchema, signUpSchema } from './authSchema';
import { testSchema } from './testSchema';
import { ISchemas } from '../interfaces/schemaInterface';

export const schemas: ISchemas = {
    login: signInSchema,
    register: signUpSchema,
    test: testSchema,
};
