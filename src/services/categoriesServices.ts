import { throwCustomError } from '../errors/throwCustomError';
import * as categoryRepository from '../repositories/categoriesRepository';

export async function findCategoryById(categoryId: number) {
    const category = await categoryRepository.findCategoryById(categoryId);
    if (!category) throw throwCustomError('not_found', 'Category not found');
    return category;
}
