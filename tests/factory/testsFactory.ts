import { faker } from '@faker-js/faker';
import { Test } from '@prisma/client';
import { database } from 'src/database/postgres';

export function __createMockTest(overrides?: Partial<Test>) {
    return {
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.lorem.words(3),
        pdfUrl: faker.internet.url(),
        categoryId: faker.number.int({ min: 1, max: 3 }),
        disciplineId: faker.number.int({ min: 1, max: 3 }),
        teacherId: 1,
        teacherDisciplineId: faker.number.int({ min: 1, max: 3 }),
        createdAt: faker.date.recent(),
        ...overrides,
    };
}

export function __createMockTestsByDiscipline(disciplineName?: string) {
    return {
        id: faker.number.int({ min: 1, max: 100 }),
        number: faker.number.int({ min: 1, max: 100 }),
        Discipline: [
            {
                id: faker.number.int({ min: 1, max: 100 }),
                name: disciplineName || faker.lorem.words(3),
                TeacherDiscipline: [
                    {
                        id: faker.number.int({ min: 1, max: 100 }),
                        Teacher: {
                            name: faker.lorem.words(3),
                        },
                        Test: [
                            {
                                id: faker.number.int({ min: 1, max: 100 }),
                                name: faker.lorem.words(3),
                                pdfUrl: faker.internet.url(),
                                createdAt: faker.date.recent(),
                            },
                        ],
                    },
                ],
            },
        ],
    };
}

export function __createMockTestsByTeacher(teacherName?: string) {
    return {
        id: faker.number.int({ min: 1, max: 100 }),
        name: teacherName || faker.lorem.words(3),
        TeacherDiscipline: [
            {
                Discipline: {
                    id: faker.number.int({ min: 1, max: 100 }),
                    name: faker.lorem.words(3),
                },
                Test: [
                    {
                        id: faker.number.int({ min: 1, max: 100 }),
                        name: faker.lorem.words(3),
                        pdfUrl: faker.internet.url(),
                        createdAt: faker.date.recent(),
                        Category: {
                            id: faker.number.int({ min: 1, max: 100 }),
                            name: faker.lorem.words(2),
                        },
                    },
                ],
            },
        ],
    };
}

export async function __createTest(teacherDisciplineId: number, categoryId: number) {
    const test = __createMockTest({ teacherDisciplineId, categoryId });
    return await database.test.create({
        data: {
            name: test.name,
            pdfUrl: test.pdfUrl,
            categoryId: test.categoryId,
            teacherDisciplineId: test.teacherDisciplineId,
        },
    });
}
