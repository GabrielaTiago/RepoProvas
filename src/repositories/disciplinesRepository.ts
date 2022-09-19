import { database } from '../database/postgres';

export async function checksTheDisciplines(disciplineId: number) {
    const discipline = await database.discipline.findUnique({
        where: { id: disciplineId }
    });
    return discipline;
}
