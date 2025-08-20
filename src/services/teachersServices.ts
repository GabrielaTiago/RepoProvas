import { throwCustomError } from '../errors/throwCustomError';
import * as teacherRepository from '../repositories/teachersRepository';

export async function checksTheTeacher(teacherId: number) {
    const teacher = await teacherRepository.checksTheTeacher(teacherId);

    if (!teacher) {
        throw throwCustomError('not_found', "This teacher doesn't exits");
    }

    return teacher;
}
