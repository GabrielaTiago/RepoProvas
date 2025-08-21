import { database } from '../database/postgres';

export async function findByTeacherAndDisciplineIds(teacherId: number, disciplineId: number) {
    const teacherDiscipline = await database.teacherDiscipline.findFirst({
        where: { teacherId, disciplineId },
    });
    return teacherDiscipline;
}
