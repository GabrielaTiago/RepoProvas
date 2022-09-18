import { database } from '../../src/database/postgres';
import { agent } from '../factory/agentFactory';
import { __createPassword, __creteUser } from '../factory/userFactory';

beforeEach(async () => {
    await database.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

afterAll(async () => {
    await database.$disconnect();
});

describe('Tests in the route /sign-up', () => {
    it('Should be able to register with valdid credentials', async () => {
        const user = await __creteUser();
        const result = await agent.post('/sign-up').send(user);
        expect(result.status).toEqual(201);
        expect(result.body).not.toBeNull();
    });

    it('Should not be able to register if the email already exits', async () => {
        const user = await __creteUser();
        await agent.post('/sign-up').send(user);
        const result = await agent.post('/sign-up').send(user);
        expect(result.status).toEqual(409);
    });

    it('Should not be able to register if the password does not macth the password confirmation', async () => {
        const user = await __creteUser();
        const wrongPassword = await __createPassword();
        const result = await agent.post('/sign-up').send({ ...user, password: wrongPassword });
        expect(result.status).toEqual(422);
        expect(user.password).not.toMatch(wrongPassword);
    });
});
