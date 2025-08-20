import { database } from '../../src/database/postgres';
import { agent } from '../factory/agentFactory';
import { __createValidTests } from '../factory/testsFactory';
import { __createSession, __createUser } from '../factory/userFactory';

beforeEach(async () => {
    await database.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
    await database.$executeRaw`TRUNCATE TABLE "tests" RESTART IDENTITY CASCADE`;
});

afterAll(async () => {
    await database.$disconnect();
});

describe('/tests', () => {
    describe('[POST] /tests', () => {
        it('Should be able to create a new test', async () => {
            const user = await __createUser();
            await agent.post('/sign-up').send(user);
            const userSession = { email: user.email, password: user.password };
            const session = await __createSession(userSession);
            const sessionData = await agent.post('/').send(session);
            const { token } = sessionData.body;
            const newTest = await __createValidTests();
            console.log(newTest);
            const result = await agent
                .post('/tests')
                .set({ Authorization: `Bearer ${token}` })
                .send(newTest);
            expect(result.status).toEqual(201);
            expect(result).not.toBeNull();
        });
    });

    describe('[GET] /test/discipline', () => {
        it('Should get the the tests filtering by the disciplines', async () => {
            const user = await __createUser();
            await agent.post('/sign-up').send(user);
            const userSession = { email: user.email, password: user.password };
            const session = await __createSession(userSession);
            const sessionData = await agent.post('/').send(session);
            const { token } = sessionData.body;
            const result = await agent.get('/tests/diciplines').set({ Authorization: `Bearer ${token}` });
            expect(result.status).toEqual(200);
            expect(Array.isArray(result.body)).toBe(true);
        });
    });

    describe('[GET] /test/teacher', () => {
        it('Should get the the tests filtering by the disciplines', async () => {
            const user = await __createUser();
            await agent.post('/sign-up').send(user);
            const userSession = { email: user.email, password: user.password };
            const session = await __createSession(userSession);
            const sessionData = await agent.post('/').send(session);
            const { token } = sessionData.body;
            const result = await agent.get('/tests/teacher').set({ Authorization: `Bearer ${token}` });
            expect(result.status).toEqual(200);
            expect(Array.isArray(result.body)).toBe(true);
        });
    });
});
