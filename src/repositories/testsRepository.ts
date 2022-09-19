import { database } from '../database/postgres';

export async function getTestsByDiscipline() {
    const testsDisciplines = await database.term.findMany({
        distinct: ['id'],
        select: {
            id: true,
            number: true,
            Discipline: {
                select: {
                    id: true,
                    name: true,
                    TeacherDiscipline: {
                        select: {
                            Teacher: {
                                select: {
                                    name: true,
                                },
                            },
                            Test: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    createdAt: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return testsDisciplines;
}

export async function getTestsByTeacher() {
    const testsTeachers = await database.teacher.findMany({
        distinct: ['name'],
        select: {
            id: true,
            name: true,
            TeacherDiscipline: {
                select: {
                    Discipline: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    Test: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            createdAt: true,
                            Category: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return testsTeachers;
}
