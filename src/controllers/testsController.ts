import { Request, Response } from 'express';

import { ITestData } from '../interfaces/testsInterface';
import * as testsServices from '../services/testsServices';

export async function insertTest(req: Request, res: Response) {
    const test: ITestData = req.body;

    await testsServices.insertTest(test);

    return res.status(201).send('Test successfully created');
}

export async function getTestsByDiscipline(req: Request, res: Response) {
    const { name } = req.query;
    const testsByDiscipline = await testsServices.getTestsByDiscipline(name as string);
    return res.status(200).send(testsByDiscipline);
}

export async function getTestsByTeacher(req: Request, res: Response) {
    const { name } = req.query;
    const testsByTeacher = await testsServices.getTestsByTeacher(name as string);
    return res.status(200).send(testsByTeacher);
}
