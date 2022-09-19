import { database } from '../database/postgres';

export async function checksTheDisciplineAndTheTeacher(teacherId: number, disciplineId: number) {
    const disciplineTeacher = database.teacherDiscipline.findFirst({
        where: {
            teacherId,
            disciplineId,
        },
    });
    return disciplineTeacher;
}
