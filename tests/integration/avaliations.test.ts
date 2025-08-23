import { database } from 'src/database/postgres';
import { TGetTestsByDiscipline, TGetTestsByTeacher } from 'src/types/testTypes';
import { describe, expect, it } from 'vitest';

import { agent } from '../factory/agentFactory';
import { __createMockTest, __createTest } from '../factory/testsFactory';
import { __createUserAndToken } from '../factory/userFactory';

describe('Tests Integration', () => {
    describe('[POST] /tests', () => {
        it('should be able to create a new test', async () => {
            const { token } = await __createUserAndToken();
            const test = __createMockTest();
            const testData = {
                name: test.name,
                pdfUrl: test.pdfUrl,
                categoryId: test.categoryId,
                disciplineId: test.disciplineId,
                teacherId: test.teacherId,
            };

            const result = await agent
                .post('/tests')
                .set({ Authorization: `Bearer ${token}` })
                .send(testData);

            expect(result.status).toEqual(201);
            expect(result.body.message).toBe('Test successfully created');

            const testInDB = await database.test.findUnique({ where: { id: result.body.test.id } });
            expect(testInDB).not.toBeNull();
            expect(testInDB?.name).toBe(testData.name);
            expect(testInDB?.pdfUrl).toBe(testData.pdfUrl);
            expect(testInDB?.categoryId).toBe(testData.categoryId);
        });

        it('should return 404 if the category does not exist', async () => {
            const { token } = await __createUserAndToken();
            const test = __createMockTest({ categoryId: 9999 });
            const testData = {
                name: test.name,
                pdfUrl: test.pdfUrl,
                categoryId: test.categoryId,
                disciplineId: test.disciplineId,
                teacherId: test.teacherId,
            };

            const result = await agent
                .post('/tests')
                .set({ Authorization: `Bearer ${token}` })
                .send(testData);

            expect(result.status).toEqual(404);
            expect(result.body.message).toBe('Category not found');
        });

        it('should return 404 if the discipline does not exist', async () => {
            const { token } = await __createUserAndToken();
            const test = __createMockTest();
            const testData = { name: test.name, pdfUrl: test.pdfUrl, categoryId: 1, disciplineId: 9999, teacherId: test.teacherId };

            const result = await agent
                .post('/tests')
                .set({ Authorization: `Bearer ${token}` })
                .send(testData);

            expect(result.status).toEqual(404);
            expect(result.body.message).toBe('Discipline not found');
        });
    });

    describe('[GET] /tests/discipline', () => {
        it('should get all the tests separated by terms and disciplines', async () => {
            const { token } = await __createUserAndToken();

            const result = await agent.get('/tests/discipline').set({ Authorization: `Bearer ${token}` });

            expect(result.status).toEqual(200);
            expect(Array.isArray(result.body)).toBe(true);
        });

        it('should return the tests filtered by the discipline name', async () => {
            const disciplineName = 'CSs';
            const { token } = await __createUserAndToken();

            // for more details, see the seed in the setup.ts file
            await __createTest(1, 1); // HTML e CSS com Diego, Projeto, Periodo 1
            await __createTest(1, 1); // HTML e CSS com Diego, Projeto, Periodo 1
            await __createTest(4, 2); // Humildade com Bruna, Prática, Periodo 1
            await __createTest(2, 1); // JavaScript com Diego, Projeto, Periodo 2
            await __createTest(2, 2); // JavaScript com Diego, Prática, Periodo 2

            const result = await agent.get(`/tests/discipline?name=${disciplineName}`).set({ Authorization: `Bearer ${token}` });

            expect(result.status).toEqual(200);
            const hasMatchingDiscipline = (term: TGetTestsByDiscipline) => {
                return term.Discipline.some((discipline) => discipline.name.toLowerCase().includes(disciplineName.toLowerCase()));
            };
            expect(result.body.some(hasMatchingDiscipline)).toBe(true);
        });
    });

    describe('[GET] /tests/teacher', () => {
        it('should get all the tests grouped by teachers', async () => {
            const { token } = await __createUserAndToken();

            const result = await agent.get('/tests/teacher').set({ Authorization: `Bearer ${token}` });

            expect(result.status).toEqual(200);
            expect(Array.isArray(result.body)).toBe(true);
        });

        it('should return the tests filtered by the teacher name', async () => {
            const teacherName = 'DIEGO';
            const { token } = await __createUserAndToken();

            await __createTest(1, 1); // HTML e CSS com Diego, Projeto
            await __createTest(2, 1); // JavaScript com Diego, Projeto
            await __createTest(5, 2); // Autoconfiança com Bruna, Prática

            const result = await agent.get(`/tests/teacher?name=${teacherName}`).set({ Authorization: `Bearer ${token}` });

            expect(result.status).toEqual(200);
            const hasMatchingTeacher = (teacher: TGetTestsByTeacher) => {
                return teacher.name.toLowerCase().includes(teacherName.toLowerCase());
            };
            expect(result.body.some(hasMatchingTeacher)).toBe(true);
        });
    });
});
