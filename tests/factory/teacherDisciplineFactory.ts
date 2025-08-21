import { faker } from '@faker-js/faker';
import { TeacherDiscipline } from '@prisma/client';

export const __createMockTeacherDiscipline = (override?: Partial<TeacherDiscipline>) => {
    return {
        id: faker.number.int({ min: 1, max: 1000 }),
        teacherId: faker.number.int({ min: 1, max: 1000 }),
        disciplineId: faker.number.int({ min: 1, max: 1000 }),
        createdAt: faker.date.recent(),
        ...override,
    };
};
