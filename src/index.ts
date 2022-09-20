import "./config/config"
import 'express-async-errors';
import swaggerUi from "swagger-ui-express";
import express, { json } from 'express';
import cors from 'cors';
import router from './routes/routes';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import swaggerDocs from "../swagger.json";

const server = express();

server.use(cors(), json());

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(router);
server.use(errorHandler);

export { server };
