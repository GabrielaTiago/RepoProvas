import { getTestsByDiscipline } from '../repositories/testsDisciplinesRepository';

export async function showTestsByDiscipline() {
    const tests = await getTestsByDiscipline();
    return tests;
}

export async function showTestsByTeacher() {
    const tests = await getTestsByTeacher();
    return tests;
}