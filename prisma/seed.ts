import { database } from '../src/database/postgres';

async function main() {
    await database.$executeRaw`TRUNCATE TABLE users, tests, teachers_disciplines, categories, disciplines, teachers, terms RESTART IDENTITY CASCADE`;

    await database.term.createMany({
        data: [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }, { number: 6 }],
    });

    await database.category.createMany({
        data: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }],
    });

    await database.teacher.createMany({
        data: [{ name: 'Diego Pinho' }, { name: 'Bruna Hamori' }],
    });

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

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await database.$disconnect();
    });
