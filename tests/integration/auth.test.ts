import { describe, expect, it } from 'vitest';

import { database } from '../../src/database/postgres';
import { agent } from '../factory/agentFactory';
import { __createAuthData, __createUser } from '../factory/userFactory';

describe('Auth Integration', () => {
    describe('[POST] /sign-up', () => {
        it('should return 201 and create a user with the correct data', async () => {
            const userData = __createAuthData();

            const result = await agent.post('/sign-up').send(userData);

            expect(result.status).toEqual(201);
            expect(result.body.message).toBe('User created successfully');

            const userInDB = await database.user.findUnique({ where: { email: userData.email } });
            expect(userInDB).not.toBeNull();
            expect(userInDB?.email).toBe(userData.email);
            expect(userInDB?.password).not.toBe(userData.password);
        });

        it('should return 409 if the email already exists', async () => {
            const userData = __createAuthData();

            await agent.post('/sign-up').send(userData);
            const result = await agent.post('/sign-up').send(userData);

            expect(result.status).toEqual(409);
            expect(result.body.message).toBe('This email has already been registered');
        });

        it('should return 422 if the password does not match the password confirmation', async () => {
            const { email, password } = __createAuthData();
            const confirmPassword = 'DiffPassword123!';

            const result = await agent.post('/sign-up').send({ email, password, confirmPassword });

            expect(result.status).toEqual(422);
            expect(result.body.message).toBe('Confirm password must match password');
        });
    });

    describe('[POST] /login', () => {
        it('should return 200 and log a user in if he has the correct credentials', async () => {
            const user = await __createUser();
            const userCredentials = { email: user.email, password: user.password };

            const result = await agent.post('/login').send(userCredentials);

            expect(result.status).toEqual(200);
            expect(result.body).not.toBeNull();
            expect(result.body).toHaveProperty('token');
            expect(result.body.message).toBe('Authentication successful');
        });

        it('should return 403 and not log the user in if he has the wrong password', async () => {
            const user = await __createUser();
            const userCredentials = { email: user.email, password: 'wrongPassword123!' };

            const result = await agent.post('/login').send(userCredentials);

            expect(result.status).toEqual(403);
            expect(result.body.message).toBe('Incorrect email and/or password');
        });

        it('should return 403 and not log the user in if he has the wrong email', async () => {
            const user = await __createUser();
            const userCredentials = { email: 'wrongEmail@example.com', password: user.password };

            const result = await agent.post('/login').send(userCredentials);

            expect(result.status).toEqual(403);
            expect(result.body.message).toBe('Incorrect email and/or password');
        });
    });
});
