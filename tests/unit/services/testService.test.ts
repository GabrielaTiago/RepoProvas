import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as testRepository from '../../../src/repositories/testsRepository';
import * as categoryService from '../../../src/services/categoriesServices';
import * as disciplineService from '../../../src/services/disciplinesServices';
import * as teacherDisciplineService from '../../../src/services/teacherDisciplinesServices';
import * as teacherService from '../../../src/services/teachersServices';
import * as testService from '../../../src/services/testsServices';
import { __createMockCategory } from '../../factory/categoryFactory';
import { __createMockDiscipline } from '../../factory/disciplineFactory';
import { __createMockTeacherDiscipline } from '../../factory/teacherDisciplineFactory';
import { __createMockTeacher } from '../../factory/teacherFactory';
import { __createMockTest, __createMockTestsByDiscipline } from '../../factory/testsFactory';

vi.mock('../../../src/repositories/testsRepository');
vi.mock('../../../src/services/categoriesServices');
vi.mock('../../../src/services/disciplinesServices');
vi.mock('../../../src/services/teacherDisciplinesServices');
vi.mock('../../../src/services/teachersServices');

describe('Tests Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('insertTest', () => {
        it('should insert a test', async () => {
            const test = __createMockTest();
            const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;
            const category = __createMockCategory();
            const discipline = __createMockDiscipline();
            const teacherDiscipline = __createMockTeacherDiscipline();
            const teacher = __createMockTeacher();
            const teacherDisciplineId = teacherDiscipline.id;

            vi.spyOn(categoryService, 'findCategoryById').mockResolvedValue(category);
            vi.spyOn(disciplineService, 'findDisciplineById').mockResolvedValue(discipline);
            vi.spyOn(teacherDisciplineService, 'findByTeacherAndDisciplineIds').mockResolvedValue(teacherDiscipline);
            vi.spyOn(teacherService, 'findTeacherById').mockResolvedValue(teacher);

            const mockInsertedTest = { id: 1, name, pdfUrl, categoryId, teacherDisciplineId, createdAt: new Date() };
            vi.spyOn(testRepository, 'insertTest').mockResolvedValue(mockInsertedTest);

            const result = await testService.insertTest({ name, pdfUrl, categoryId, disciplineId, teacherId });

            expect(result).toBeDefined();
            expect(categoryService.findCategoryById).toHaveBeenCalledWith(categoryId);
            expect(disciplineService.findDisciplineById).toHaveBeenCalledWith(disciplineId);
            expect(teacherDisciplineService.findByTeacherAndDisciplineIds).toHaveBeenCalledWith(teacherId, disciplineId);
            expect(teacherService.findTeacherById).toHaveBeenCalledWith(teacherId);
            expect(testRepository.insertTest).toHaveBeenCalledWith({ name, pdfUrl, categoryId, teacherDisciplineId });
        });

        it('should throw an error if the category is not found', async () => {
            const test = __createMockTest();
            const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;

            vi.spyOn(categoryService, 'findCategoryById').mockRejectedValue('Category not found');

            await expect(testService.insertTest({ name, pdfUrl, categoryId, disciplineId, teacherId })).rejects.toThrow(
                'Category not found'
            );
            expect(categoryService.findCategoryById).toHaveBeenCalledWith(categoryId);
            expect(disciplineService.findDisciplineById).not.toHaveBeenCalled();
            expect(teacherService.findTeacherById).not.toHaveBeenCalled();
            expect(teacherDisciplineService.findByTeacherAndDisciplineIds).not.toHaveBeenCalled();
            expect(testRepository.insertTest).not.toHaveBeenCalled();
        });

        it('should throw an error if the discipline is not found', async () => {
            const test = __createMockTest();
            const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;
            const category = __createMockCategory();

            vi.spyOn(categoryService, 'findCategoryById').mockResolvedValue(category);
            vi.spyOn(disciplineService, 'findDisciplineById').mockRejectedValue('Discipline not found');

            await expect(testService.insertTest({ name, pdfUrl, categoryId, disciplineId, teacherId })).rejects.toThrow(
                'Discipline not found'
            );
            expect(categoryService.findCategoryById).toHaveBeenCalledWith(categoryId);
            expect(disciplineService.findDisciplineById).toHaveBeenCalledWith(disciplineId);
            expect(teacherService.findTeacherById).not.toHaveBeenCalled();
            expect(teacherDisciplineService.findByTeacherAndDisciplineIds).not.toHaveBeenCalled();
            expect(testRepository.insertTest).not.toHaveBeenCalled();
        });

        it('should throw an error if the teacher is not found', async () => {
            const test = __createMockTest();
            const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;
            const category = __createMockCategory();
            const discipline = __createMockDiscipline();

            vi.spyOn(categoryService, 'findCategoryById').mockResolvedValue(category);
            vi.spyOn(disciplineService, 'findDisciplineById').mockResolvedValue(discipline);
            vi.spyOn(teacherService, 'findTeacherById').mockRejectedValue('Teacher not found');

            await expect(testService.insertTest({ name, pdfUrl, categoryId, disciplineId, teacherId })).rejects.toThrow(
                'Teacher not found'
            );
            expect(categoryService.findCategoryById).toHaveBeenCalledWith(categoryId);
            expect(disciplineService.findDisciplineById).toHaveBeenCalledWith(disciplineId);
            expect(teacherService.findTeacherById).toHaveBeenCalledWith(teacherId);
            expect(teacherDisciplineService.findByTeacherAndDisciplineIds).not.toHaveBeenCalled();
            expect(testRepository.insertTest).not.toHaveBeenCalled();
        });

        it('should throw an error if the teacher discipline is not found', async () => {
            const test = __createMockTest();
            const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;
            const category = __createMockCategory();
            const discipline = __createMockDiscipline();
            const teacher = __createMockTeacher();

            vi.spyOn(categoryService, 'findCategoryById').mockResolvedValue(category);
            vi.spyOn(disciplineService, 'findDisciplineById').mockResolvedValue(discipline);
            vi.spyOn(teacherService, 'findTeacherById').mockResolvedValue(teacher);
            vi.spyOn(teacherDisciplineService, 'findByTeacherAndDisciplineIds').mockRejectedValue('Teacher discipline not found');

            await expect(testService.insertTest({ name, pdfUrl, categoryId, disciplineId, teacherId })).rejects.toThrow(
                'Teacher discipline not found'
            );
            expect(categoryService.findCategoryById).toHaveBeenCalledWith(categoryId);
            expect(disciplineService.findDisciplineById).toHaveBeenCalledWith(disciplineId);
            expect(teacherService.findTeacherById).toHaveBeenCalledWith(teacherId);
            expect(teacherDisciplineService.findByTeacherAndDisciplineIds).toHaveBeenCalledWith(teacherId, disciplineId);
            expect(testRepository.insertTest).not.toHaveBeenCalled();
        });
    });

    describe('getTestsByDiscipline', () => {
        it('should return tests grouped by discipline', async () => {
            const mockTestsByDiscipline = [__createMockTestsByDiscipline(), __createMockTestsByDiscipline()];

            vi.spyOn(testRepository, 'getTestsByDiscipline').mockResolvedValue(mockTestsByDiscipline);

            const result = await testService.getTestsByDiscipline('');

            expect(testRepository.getTestsByDiscipline).toHaveBeenCalledWith('');
            expect(result).toEqual(mockTestsByDiscipline);
        });

        it('should return tests filtered by discipline name', async () => {
            const disciplineName = 'React';
            const mockFilteredTests = [__createMockTestsByDiscipline(disciplineName), __createMockTestsByDiscipline(disciplineName)];

            vi.spyOn(testRepository, 'getTestsByDiscipline').mockResolvedValue(mockFilteredTests);

            const result = await testService.getTestsByDiscipline(disciplineName);

            expect(testRepository.getTestsByDiscipline).toHaveBeenCalledWith(disciplineName);
            expect(result).toEqual(mockFilteredTests);
            expect(result).toBeInstanceOf(Array);
            result.forEach((test) => {
                expect(test.Discipline).toHaveLength(1);
                expect(test.Discipline[0].name).toBe(disciplineName);
            });
        });
    });
});
