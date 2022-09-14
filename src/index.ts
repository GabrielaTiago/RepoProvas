import express, { json } from 'express';
import cors from 'cors';

const server = express();

server.use(cors(), json());

export { server };
