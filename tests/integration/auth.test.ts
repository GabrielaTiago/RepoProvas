import { database } from '../../src/database/postgres';
import { agent } from '../factory/agentFactory';
import { __createEmail, __createPassword, __createSession, __createUser } from '../factory/userFactory';

beforeEach(async () => {
    await database.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

afterAll(async () => {
    await database.$disconnect();
});

describe('Tests in the route /sign-up', () => {
    it('Should be able to register with valdid credentials', async () => {
        const user = await __createUser();
        const result = await agent.post('/sign-up').send(user);
        expect(result.status).toEqual(201);
        expect(result.body).not.toBeNull();
    });

    it('Should not be able to register if the email already exits', async () => {
        const user = await __createUser();
        await agent.post('/sign-up').send(user);
        const result = await agent.post('/sign-up').send(user);
        expect(result.status).toEqual(409);
    });

    it('Should not be able to register if the password does not macth the password confirmation', async () => {
        const user = await __createUser();
        const wrongPassword = await __createPassword();
        const result = await agent.post('/sign-up').send({ ...user, password: wrongPassword });
        expect(result.status).toEqual(422);
        expect(user.password).not.toMatch(wrongPassword);
    });
});

describe('Tests in the route /', () => {
    it('Should log a user in if he has the correct credentials', async () => {
        const user = await __createUser();
        await agent.post('/sign-up').send(user);
        const userSession = { email: user.email, password: user.password };
        const session = await __createSession(userSession);
        const result = await agent.post('/').send(session);
        expect(result.status).toEqual(200);
        expect(result.body).not.toBeNull();
        expect(result.body).toHaveProperty('token');
    });

    it('Should not log the user in if he has the wrong password', async () => {
        const user = await __createUser();
        await agent.post('/sign-up').send(user);
        const wrongPassword = await __createPassword();
        const userSession = { email: user.email, password: wrongPassword };
        const session = await __createSession(userSession);
        const result = await agent.post('/').send(session);
        expect(result.status).toEqual(403);
        expect(result.body).not.toBeNull();
    });

    it('Should not log the user in if he has the wrong email', async () => {
        const user = await __createUser();
        await agent.post('/sign-up').send(user);
        const wrongEmail = await __createEmail();
        const userSession = { email: wrongEmail, password: user.password };
        const session = await __createSession(userSession);
        const result = await agent.post('/').send(session);
        expect(result.status).toEqual(403);
        expect(result.body).not.toBeNull();
    });
});
