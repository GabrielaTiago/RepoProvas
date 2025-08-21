import { throwCustomError } from '../errors/throwCustomError';
import * as disciplineRepository from '../repositories/disciplinesRepository';

export async function findDisciplineById(disciplineId: number) {
    const discipline = await disciplineRepository.findDisciplineById(disciplineId);
    if (!discipline) throw throwCustomError('not_found', 'Discipline not found');
    return discipline;
}
