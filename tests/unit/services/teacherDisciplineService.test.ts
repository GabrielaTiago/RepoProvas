import { describe, it, expect, vi } from 'vitest';

import * as teacherDisciplineRepository from '../../../src/repositories/teacherDisciplinesRepository';
import * as teacherDisciplinesService from '../../../src/services/teacherDisciplinesServices';
import { __createMockTeacherDiscipline } from '../../factory/teacherDisciplineFactory';

vi.mock('../../../src/repositories/teacherDisciplinesRepository');

describe('Teacher Disciplines Service', () => {
    describe('findByTeacherAndDisciplineIds', () => {
        it('should return the teacher discipline if it exists', async () => {
            const teacherDiscipline = __createMockTeacherDiscipline();

            vi.spyOn(teacherDisciplineRepository, 'findByTeacherAndDisciplineIds').mockResolvedValue(teacherDiscipline);

            const result = await teacherDisciplinesService.findByTeacherAndDisciplineIds(
                teacherDiscipline.teacherId,
                teacherDiscipline.disciplineId
            );

            expect(result).toBeDefined();
            expect(result).toEqual(teacherDiscipline);
            expect(teacherDisciplineRepository.findByTeacherAndDisciplineIds).toHaveBeenCalledWith(
                teacherDiscipline.teacherId,
                teacherDiscipline.disciplineId
            );
        });

        it('should throw an error if the teacher discipline does not exist', async () => {
            const teacherId = 999;
            const disciplineId = 999;

            vi.spyOn(teacherDisciplineRepository, 'findByTeacherAndDisciplineIds').mockResolvedValue(null);

            await expect(teacherDisciplinesService.findByTeacherAndDisciplineIds(teacherId, disciplineId)).rejects.toThrow(
                'Teacher discipline not found'
            );
            expect(teacherDisciplineRepository.findByTeacherAndDisciplineIds).toHaveBeenCalledWith(teacherId, disciplineId);
        });
    });
});
