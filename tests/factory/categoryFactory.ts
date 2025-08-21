import { faker } from '@faker-js/faker';
import { Category } from '@prisma/client';

export function __createMockCategory(override?: Partial<Category>) {
    return {
        id: faker.number.int({ min: 1, max: 1000 }),
        name: faker.lorem.word(),
        createdAt: faker.date.recent(),
        ...override,
    };
}
