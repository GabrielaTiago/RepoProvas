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
    const testsByTeachers = await database.teacher.findMany({
        select : {
            id: true,
            name: true
        }
    });

    const teacherTests = await Promise.all(testsByTeachers.map(async(teacherTest)=> {
        const infoTests = await database.category.findMany({
            select: {
                id: true,
                name: true,
                Test: {
                    select: {
                        id: true,
                        name: true,
                        pdfUrl: true,
                        TeacherDiscipline: {
                            select: {
                                Discipline: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }, 
                    }
                }
            }
        });
    }));
    
}