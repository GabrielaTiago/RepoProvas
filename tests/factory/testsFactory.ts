import { faker } from '@faker-js/faker';
import { Test } from '@prisma/client';
import { database } from 'src/database/postgres';
import { TGetTestsByDiscipline, TGetTestsByTeacher } from 'src/types/testTypes';

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

export function __createMockTestsByDiscipline(disciplineName?: string): TGetTestsByDiscipline {
    return {
        id: faker.number.int({ min: 1, max: 100 }),
        number: faker.number.int({ min: 1, max: 100 }),
        Discipline: [
            {
                id: faker.number.int({ min: 1, max: 100 }),
                name: disciplineName || faker.lorem.words(3),
                TeacherDiscipline: [
                    {
                        Teacher: {
                            id: faker.number.int({ min: 1, max: 100 }),
                            name: faker.lorem.words(3),
                        },
                        Test: [
                            {
                                id: faker.number.int({ min: 1, max: 100 }),
                                name: faker.lorem.words(3),
                                pdfUrl: faker.internet.url(),
                            },
                        ],
                    },
                ],
            },
        ],
    };
}

export function __createMockTestsByTeacher(teacherName?: string): TGetTestsByTeacher {
    return {
        id: faker.number.int({ min: 1, max: 100 }),
        name: teacherName || faker.lorem.words(3),
        TeacherDiscipline: [
            {
                Discipline: {
                    id: faker.number.int({ min: 1, max: 100 }),
                    name: faker.lorem.words(3),
                    term: {
                        id: faker.number.int({ min: 1, max: 100 }),
                        number: faker.number.int({ min: 1, max: 100 }),
                    },
                },
                Test: [
                    {
                        id: faker.number.int({ min: 1, max: 100 }),
                        name: faker.lorem.words(3),
                        pdfUrl: faker.internet.url(),
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
