import { Request, Response } from 'express';
import { ITestData } from '../interfaces/testsInterface';

import * as testsServices from '../services/testsServices';

export async function insertTest(req: Request, res: Response) {
    const test: ITestData = req.body;

    await testsServices.insertTest(test);

    return res.status(201).send('Test successfully created');
}

export async function getTestsByDiscipline(req: Request, res: Response) {
    const testsByDiscipline = await testsServices.showTestsByDiscipline();
    return res.status(200).send(testsByDiscipline);
}

export async function getTestByTeacher(req: Request, res: Response){
    const testsByteacher = await testsServices.showTestsByTeacher();
    return res.status(200).send(testsByteacher);
}