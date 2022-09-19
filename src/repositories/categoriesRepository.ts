import { database } from '../database/postgres';

export async function checksTheCategory(categoryId: number) {
    const category = await database.category.findUnique({
        where: { id: categoryId },
    });
    return category;
}
