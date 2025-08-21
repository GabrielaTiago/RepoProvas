import * as dotenv from 'dotenv';
import { beforeAll, afterAll, beforeEach } from 'vitest';

import { database } from '../src/database/postgres';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await database.$connect();
});

beforeEach(async () => {
    await resetDatabase();
    await seedTerms();
    await seedCategories();
    await seedTeachers();
    await seedDisciplines();
    await seedTeacherDisciplines();
});

afterAll(async () => {
    await database.$disconnect();
});

async function resetDatabase() {
    await database.$executeRaw`TRUNCATE TABLE users, tests, teachers_disciplines, categories, disciplines, teachers, terms RESTART IDENTITY CASCADE`;
}

async function seedTerms() {
    await database.term.createMany({
        data: [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }, { number: 6 }],
    });
}

async function seedCategories() {
    await database.category.createMany({
        data: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }],
    });
}

async function seedTeachers() {
    await database.teacher.createMany({
        data: [{ name: 'Diego Pinho' }, { name: 'Bruna Hamori' }],
    });
}

async function seedDisciplines() {
    await database.discipline.createMany({
        data: [
            { name: 'HTML e CSS', termId: 1 },
            { name: 'JavaScript', termId: 2 },
            { name: 'React', termId: 3 },
            { name: 'Humildade', termId: 1 },
            { name: 'Planejamento', termId: 2 },
            { name: 'Autoconfiança', termId: 3 },
        ],
    });
}

async function seedTeacherDisciplines() {
    await database.teacherDiscipline.createMany({
        data: [
            { teacherId: 1, disciplineId: 1 },
            { teacherId: 1, disciplineId: 2 },
            { teacherId: 1, disciplineId: 3 },
            { teacherId: 2, disciplineId: 4 },
            { teacherId: 2, disciplineId: 5 },
            { teacherId: 2, disciplineId: 6 },
        ],
    });
}
