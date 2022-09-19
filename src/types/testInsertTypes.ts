import { Test } from "@prisma/client";

export type TInsertTest = Omit<Test, "id" | "createdAt">;