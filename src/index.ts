import express, { json } from 'express';
import cors from 'cors';
import router from './routes/routes';

const server = express();

server.use(cors(), json());
server.use(router);

export { server };
