import { Router } from 'express';
import { validateShemas } from '../middlewares/validateSchemasMiddleware';

import * as testsController from '../controllers/testsController';

const testsRouter = Router();

testsRouter.post('/tests', validateShemas('test'), testsController.insertTest);
testsRouter.get('/tests/discipline', testsController.getTestsByDiscipline);
testsRouter.get('/tests/teacher', testsController.getTestByTeacher);

export default testsRouter;