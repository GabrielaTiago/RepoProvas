import { describe, it, expect, vi } from 'vitest';

import * as categoryRepository from '../../../src/repositories/categoriesRepository';
import * as categoriesService from '../../../src/services/categoriesServices';
import { __createMockCategory } from '../../factory/categoryFactory';

vi.mock('../../../src/repositories/categoriesRepository');

describe('Categories Service', () => {
    describe('findCategoryById', () => {
        it('should return the category if it exists', async () => {
            const category = __createMockCategory();

            vi.spyOn(categoryRepository, 'findCategoryById').mockResolvedValue(category);

            const result = await categoriesService.findCategoryById(category.id);

            expect(result).toBeDefined();
            expect(result).toEqual(category);
            expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(category.id);
        });

        it('should throw an error if the category does not exist', async () => {
            const categoryId = 999;

            vi.spyOn(categoryRepository, 'findCategoryById').mockResolvedValue(null);

            await expect(categoriesService.findCategoryById(categoryId)).rejects.toThrow('Category not found');
            expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(categoryId);
        });
    });
});
