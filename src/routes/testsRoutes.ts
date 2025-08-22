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
 *                   term:
 *                     type: object
 *                     properties:
 *                       number:
 *                         type: integer
 *                         description: Term number
 *                       disciplines:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               description: Discipline name
 *                             categories:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   name:
 *                                     type: string
 *                                     description: Category name (P1, P2, P3, etc.)
 *                                   tests:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         id:
 *                                           type: integer
 *                                         name:
 *                                           type: string
 *                                         pdfUrl:
 *                                           type: string
 *                                         teacher:
 *                                           type: string
 *                                           description: Teacher name
 *             example:
 *               - term:
 *                   number: 1
 *                   disciplines:
 *                     - name: "Calculus"
 *                       categories:
 *                         - name: "P1"
 *                           tests:
 *                             - id: 1
 *                               name: "Calculus P1 2023"
 *                               pdfUrl: "https://example.com/exams/calculus-p1-2023.pdf"
 *                               teacher: "Dr. Smith"
 *                         - name: "P2"
 *                           tests:
 *                             - id: 2
 *                               name: "Calculus P2 2023"
 *                               pdfUrl: "https://example.com/exams/calculus-p2-2023.pdf"
 *                               teacher: "Dr. Smith"
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
 *                   teacher:
 *                     type: string
 *                     description: Teacher name
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: Category name (P1, P2, P3, etc.)
 *                         tests:
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
 *                               discipline:
 *                                 type: string
 *                                 description: Discipline name
 *             example:
 *               - teacher: "Dr. Smith"
 *                 categories:
 *                   - name: "P1"
 *                     tests:
 *                       - id: 1
 *                         name: "Calculus P1 2023"
 *                         pdfUrl: "https://example.com/exams/calculus-p1-2023.pdf"
 *                         discipline: "Calculus"
 *                   - name: "P2"
 *                     tests:
 *                       - id: 2
 *                         name: "Calculus P2 2023"
 *                         pdfUrl: "https://example.com/exams/calculus-p2-2023.pdf"
 *                         discipline: "Calculus"
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
