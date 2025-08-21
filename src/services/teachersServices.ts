import { throwCustomError } from '../errors/throwCustomError';
import * as teacherRepository from '../repositories/teachersRepository';

export async function findTeacherById(teacherId: number) {
    const teacher = await teacherRepository.findTeacherById(teacherId);
    if (!teacher) throw throwCustomError('not_found', 'Teacher not found');
    return teacher;
}
