import { Request, Response } from 'express';

import * as testsServices from '../services/testsServices';

export async function getTestsByDiscipline(req: Request, res: Response) {
    const testsByDiscipline = await testsServices.showTestsByDiscipline();
    return res.status(200).send(testsByDiscipline);
}

export async function getTestByTeacher(req: Request, res: Response){
    const testsByteacher = await testsServices.showTestsByTeacher();
    return res.status(200).send(testsByteacher);
}