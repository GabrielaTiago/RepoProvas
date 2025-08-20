import { throwCustomError } from '../errors/throwErrors';
import * as categoryRepository from '../repositories/categoriesRepository';

export async function checksTheCategory(categoryId: number) {
    const category = await categoryRepository.checksTheCategory(categoryId);

    if (!category) {
        throw throwCustomError('not_found', "This category doesn't exits");
    }

    return category;
}
