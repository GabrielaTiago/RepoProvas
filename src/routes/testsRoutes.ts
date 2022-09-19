import { Router } from 'express';

import * as testsController from '../controllers/testsController';

const testsRouter = Router();

testsRouter.post('/tests');
testsRouter.get('/tests/discipline', testsController.getTestsByDiscipline);
testsRouter.get('/tests/teacher', testsController.getTestByTeacher);

export default testsRouter;