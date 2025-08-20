import { Router } from 'express';

import * as testsController from '../controllers/testsController';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { schemas } from '../schemas/schemas';

const testsRouter = Router();

testsRouter.post('/tests', validateSchema(schemas.test), testsController.insertTest);
testsRouter.get('/tests/discipline', testsController.getTestsByDiscipline);
testsRouter.get('/tests/teacher', testsController.getTestByTeacher);

export default testsRouter;
