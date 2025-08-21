import { describe, it, expect, vi } from 'vitest';

import * as teacherRepository from '../../../src/repositories/teachersRepository';
import * as teachersService from '../../../src/services/teachersServices';
import { __createMockTeacher } from '../../factory/teacherFactory';

vi.mock('../../../src/repositories/teachersRepository');

describe('Teachers Service', () => {
    describe('findTeacherById', () => {
        it('should return the teacher if it exists', async () => {
            const teacher = __createMockTeacher();

            vi.spyOn(teacherRepository, 'findTeacherById').mockResolvedValue(teacher);

            const result = await teachersService.findTeacherById(teacher.id);

            expect(result).toBeDefined();
            expect(result).toEqual(teacher);
            expect(teacherRepository.findTeacherById).toHaveBeenCalledWith(teacher.id);
        });

        it('should throw an error if the teacher does not exist', async () => {
            const teacherId = 999;

            vi.spyOn(teacherRepository, 'findTeacherById').mockResolvedValue(null);

            await expect(teachersService.findTeacherById(teacherId)).rejects.toThrow('Teacher not found');
            expect(teacherRepository.findTeacherById).toHaveBeenCalledWith(teacherId);
        });
    });
});