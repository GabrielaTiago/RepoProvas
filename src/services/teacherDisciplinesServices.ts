import { throwCustomError } from '../errors/throwCustomError';
import * as teacherDisciplineRepository from '../repositories/teacherDisciplinesRepository';

export async function checksTheDisciplineAndTheTeacher(teacherId: number, disciplineId: number) {
    const teacherDiscipline = await teacherDisciplineRepository.checksTheDisciplineAndTheTeacher(teacherId, disciplineId);
    if (!teacherDiscipline) {
        throw throwCustomError('not_found', 'This teacher does not teach this subject!');
    }

    return teacherDiscipline;
}
