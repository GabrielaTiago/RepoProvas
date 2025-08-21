import { faker } from '@faker-js/faker';
import { Discipline } from '@prisma/client';

export function __createMockDiscipline(override?: Partial<Discipline>) {
    return {
        id: faker.number.int({ min: 1, max: 1000 }),
        name: faker.lorem.word(),
        termId: faker.number.int({ min: 1, max: 1000 }),
        createdAt: faker.date.recent(),
        ...override,
    };
}
