import { database } from '../database/postgres';
import { TGetTestsByDiscipline, TGetTestsByTeacher, TInsertTest } from '../types/testTypes';

export async function insertTest(testData: TInsertTest) {
    return await database.test.create({ data: testData });
}

export async function getTestsByDiscipline(name: string = ''): Promise<TGetTestsByDiscipline[]> {
    return await database.term.findMany({
        distinct: ['id'],
        select: {
            id: true,
            number: true,
            Discipline: {
                where: {
                    name: { contains: name, mode: 'insensitive' as const },
                },
                select: {
                    id: true,
                    name: true,
                    TeacherDiscipline: {
                        select: {
                            Teacher: {
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
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}

export async function getTestsByTeacher(name: string = ''): Promise<TGetTestsByTeacher[]> {
    const testsTeachers: TGetTestsByTeacher[] = await database.teacher.findMany({
        where: {
            name: { contains: name, mode: 'insensitive' as const },
        },
        select: {
            id: true,
            name: true,
            TeacherDiscipline: {
                select: {
                    Discipline: {
                        select: {
                            id: true,
                            name: true,
                            term: {
                                select: {
                                    id: true,
                                    number: true,
                                },
                            },
                        },
                    },
                    Test: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                        },
                    },
                },
            },
        },
    });
    return testsTeachers;
}
