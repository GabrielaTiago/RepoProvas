import { faker } from '@faker-js/faker';
import { Teacher } from '@prisma/client';

export function __createMockTeacher(override?: Partial<Teacher>) {
    return {
        id: faker.number.int({ min: 1, max: 1000 }),
        name: faker.person.fullName(),
        createdAt: faker.date.recent(),
        ...override,
    };
}
