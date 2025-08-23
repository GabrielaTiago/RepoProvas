import { Router } from 'express';

import * as testsController from '../controllers/testsController';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { schemas } from '../schemas/schemas';

const testsRouter = Router();

/**
 * @swagger
 * /tests:
 *   post:
 *     summary: Create a new test
 *     description: Upload a new exam with metadata including name, PDF URL, category, discipline and teacher
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestRequest'
 *     responses:
 *       201:
 *         description: Test created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example:
 *               message: "Test created successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Invalid or missing token"
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Invalid or missing token"
 */
testsRouter.post('/tests', validateSchema(schemas.test), testsController.insertTest);

/**
 * @swagger
 * /tests/discipline:
 *   get:
 *     summary: Get tests organized by discipline
 *     description: Retrieve all tests grouped by discipline, then by term, and finally by category (P1, P2, P3, etc.)
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Discipline name
 *         required: false
 *         schema:
 *           type: string
 *           example: "HTML e CSS"
 *     responses:
 *       200:
 *         description: Tests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Term ID
 *                   number:
 *                     type: integer
 *                     description: Term number
 *                   Discipline:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         TeacherDiscipline:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               Teacher:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                   name:
 *                                     type: string
 *                               Test:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                     name:
 *                                       type: string
 *                                     pdfUrl:
 *                                       type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Invalid or missing token"
 */
testsRouter.get('/tests/discipline', testsController.getTestsByDiscipline);

/**
 * @swagger
 * /tests/teacher:
 *   get:
 *     summary: Get tests organized by teacher
 *     description: Retrieve all tests grouped by teacher, then by category (P1, P2, P3, etc.)
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Teacher name
 *         required: false
 *         schema:
 *           type: string
 *           example: "Diego"
 *     responses:
 *       200:
 *         description: Tests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   TeacherDiscipline:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Discipline:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                             term:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                 number:
 *                                   type: integer
 *                         Test:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               name:
 *                                 type: string
 *                               pdfUrl:
 *                                 type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Invalid or missing token"
 */
testsRouter.get('/tests/teacher', testsController.getTestsByTeacher);

export default testsRouter;
