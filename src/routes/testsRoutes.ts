import { Router } from 'express';

import * as testsController from '../controllers/testsController';
import { validateShemas } from '../middlewares/validateSchemasMiddleware';

const testsRouter = Router();

testsRouter.post('/tests', validateShemas('test'), testsController.insertTest);
testsRouter.get('/tests/discipline', testsController.getTestsByDiscipline);
testsRouter.get('/tests/teacher', testsController.getTestByTeacher);

export default testsRouter;
