import pkg from '@prisma/client';

const { PrismaClient } = pkg;

export const database = new PrismaClient();
