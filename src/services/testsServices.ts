import { ITestData } from '../interfaces/testsInterface';

import * as repositoryTests from '../repositories/testsRepository';
import * as categoryService from './categoriesServices';
import * as disciplineService from './disciplinesServices';
import * as teacherService from './teachersServices';
import * as teacherDisciplinesService from './teacherDisciplinesServices';

export async function insertTest(test: ITestData) {
    await categoryService.checksTheCategory(test.categoryId);
    await disciplineService.checksTheDiscipline(test.disciplineId);
    await teacherService.checksTheTeacher(test.teacherId);

    const teacherDiscipline = await teacherDisciplinesService.checksTheDisciplineAndTheTeacher(test.teacherId, test.disciplineId);

    const testData = {
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: test.categoryId,
        teacherDisciplineId: Number(teacherDiscipline.id),
    };

    const newTest = await repositoryTests.insertTest(testData);
    return newTest;
}

export async function showTestsByDiscipline() {
    const tests = await repositoryTests.getTestsByDiscipline();
    return tests;
}

export async function showTestsByTeacher() {
    const tests = await repositoryTests.getTestsByTeacher();
    return tests;
}