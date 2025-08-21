import { throwCustomError } from '../errors/throwCustomError';
import * as teacherDisciplineRepository from '../repositories/teacherDisciplinesRepository';

export async function findByTeacherAndDisciplineIds(teacherId: number, disciplineId: number) {
    const teacherDiscipline = await teacherDisciplineRepository.findByTeacherAndDisciplineIds(teacherId, disciplineId);
    if (!teacherDiscipline) throw throwCustomError('not_found', 'Teacher discipline not found');
    return teacherDiscipline;
}
