import supertest from "supertest";
import { server } from "../../src";

export const agent = supertest(server);