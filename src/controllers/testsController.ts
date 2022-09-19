import { Request, Response } from 'express';

import * as testsServices from '../services/testsServices';

export async function getTestsByDiscipline(req: Request, res: Response) {
    const testsByDiscipline = testsServices.showTestsByDiscipline();
    return res.status(200).send(testsByDiscipline);
}
