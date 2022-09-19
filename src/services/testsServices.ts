import { getTestsByDiscipline } from '../repositories/testsDisciplinesRepository';

export async function showTestsByDiscipline() {
    const tests = await getTestsByDiscipline();
    return tests;
}
