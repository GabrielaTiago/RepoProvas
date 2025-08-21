import { describe, it, expect, vi } from 'vitest';

import * as disciplineRepository from '../../../src/repositories/disciplinesRepository';
import * as disciplinesService from '../../../src/services/disciplinesServices';
import { __createMockDiscipline } from '../../factory/disciplineFactory';

vi.mock('../../../src/repositories/disciplinesRepository');

describe('Disciplines Service', () => {
    describe('findDisciplineById', () => {
        it('should return the discipline if it exists', async () => {
            const discipline = __createMockDiscipline();

            vi.spyOn(disciplineRepository, 'findDisciplineById').mockResolvedValue(discipline);

            const result = await disciplinesService.findDisciplineById(discipline.id);

            expect(result).toBeDefined();
            expect(result).toEqual(discipline);
            expect(disciplineRepository.findDisciplineById).toHaveBeenCalledWith(discipline.id);
        });

        it('should throw an error if the discipline does not exist', async () => {
            const disciplineId = 999;

            vi.spyOn(disciplineRepository, 'findDisciplineById').mockResolvedValue(null);

            await expect(disciplinesService.findDisciplineById(disciplineId)).rejects.toThrow('Discipline not found');
        });
    });
});