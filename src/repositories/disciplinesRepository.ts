import { database } from '../database/postgres';

export async function findDisciplineById(id: number) {
    const discipline = await database.discipline.findUnique({
        where: { id },
    });
    return discipline;
}
