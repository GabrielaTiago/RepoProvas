import { database } from '../database/postgres';

export async function findCategoryById(id: number) {
    const category = await database.category.findUnique({
        where: { id },
    });
    return category;
}
