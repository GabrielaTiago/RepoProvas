import { Router } from "express";

const testsRouter = Router();

testsRouter.post("/tests")
testsRouter.get('/tests/discipline');
testsRouter.get('/tests/teacher');

export default testsRouter;