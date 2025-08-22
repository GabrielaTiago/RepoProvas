import { faker } from '@faker-js/faker';
import { Test } from '@prisma/client';

export async function __createValidTests() {
    const test = {
        name: faker.lorem.words(3),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 4,
        teacherId: 2,
    };
    return test;
}

export function __createMockTest(overrides?: Partial<Test>) {
    return {
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.lorem.words(3),
        pdfUrl: faker.internet.url(),
        categoryId: faker.number.int({ min: 1, max: 100 }),
        disciplineId: faker.number.int({ min: 1, max: 100 }),
        teacherId: faker.number.int({ min: 1, max: 100 }),
        teacherDisciplineId: faker.number.int({ min: 1, max: 100 }),
        createdAt: faker.date.recent(),
        ...overrides,
    };
}
