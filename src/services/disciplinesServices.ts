import { throwCustomError } from '../errors/throwErrors';
import * as disciplineRepository from '../repositories/disciplinesRepository';

export async function checksTheDiscipline(disciplineId: number) {
    const discipline = await disciplineRepository.checksTheDiscipline(disciplineId);

    if (!discipline) {
        throw throwCustomError('not_found', "This discipline doesn't exits");
    }

    return discipline;
}
