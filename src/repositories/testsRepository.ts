import { database } from '../database/postgres';

export async function getTestsByDiscipline() {
    const terms = await database.term.findMany({
        select: {
            id: true,
            number: true,
            Discipline: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    const categories = await Promise.all(
        terms.map(async (term) => {
            const category = await database.category.findMany({
                select: {
                    id: true,
                    name: true,
                    Test: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            createdAt: true,
                            TeacherDiscipline: {
                                select: {
                                    disciplineId: true,
                                    Teacher: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        })
    );
}

export async function getTestsByTeacher() {
    const testsTeachers = await database.teacher.findMany({
        distinct: ["name"],
        select: {
            id: true,
            name: true,
            TeacherDiscipline: {
                select: {
                    Discipline: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    Test: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            createdAt: true,
                            Category: {
                                select: {
                                    id:true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return testsTeachers;
}