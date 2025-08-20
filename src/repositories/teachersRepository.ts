import { database } from '../database/postgres';

export async function checksTheTeacher(teacherId: number) {
    const teacher = await database.teacher.findUnique({
        where: { id: teacherId },
    });
    return teacher;
}
