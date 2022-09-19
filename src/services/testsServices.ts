import * as repositoryTests from "../repositories/testsRepository";

export async function showTestsByDiscipline() {
    const tests = await repositoryTests.getTestsByDiscipline();
    return tests;
}

export async function showTestsByTeacher() {
    const tests = await repositoryTests.getTestsByTeacher();
    return tests;
}