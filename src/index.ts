import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';
import router from './routes/routes';
import { errorHandler } from './middlewares/errorHandlerMiddleware';

const server = express();

server.use(cors(), json());
server.use(router);
server.use(errorHandler);

export { server };
