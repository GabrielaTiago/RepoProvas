import { database } from '../database/postgres';

export async function findTeacherById(id: number) {
    const teacher = await database.teacher.findUnique({
        where: { id },
    });
    return teacher;
}
