import * as categoryService from './categoriesServices';
import * as disciplineService from './disciplinesServices';
import * as teacherDisciplinesService from './teacherDisciplinesServices';
import * as teacherService from './teachersServices';
import { ITestData } from '../interfaces/testsInterface';
import * as repositoryTests from '../repositories/testsRepository';

export async function insertTest(test: ITestData) {
    await categoryService.findCategoryById(test.categoryId);
    await disciplineService.findDisciplineById(test.disciplineId);
    await teacherService.findTeacherById(test.teacherId);

    const teacherDiscipline = await teacherDisciplinesService.findByTeacherAndDisciplineIds(test.teacherId, test.disciplineId);
    const testData = {
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: test.categoryId,
        teacherDisciplineId: teacherDiscipline.id,
    };
    return await repositoryTests.insertTest(testData);
}

export async function getTestsByDiscipline(name: string) {
    const tests = await repositoryTests.getTestsByDiscipline(name);
    return tests;
}

export async function getTestsByTeacher(name: string) {
    const tests = await repositoryTests.getTestsByTeacher(name);
    return tests;
}
