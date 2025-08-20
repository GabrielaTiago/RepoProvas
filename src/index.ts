import './config/config';
import 'express-async-errors';
import cors from 'cors';
import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from '../swagger.json';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import router from './routes/routes';

const server = express();

server.use(cors(), json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(router);
server.use(errorHandler);

export { server };
