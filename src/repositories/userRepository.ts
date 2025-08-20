import { database } from '../database/postgres';

export async function findUserByEmail(email: string) {
    const user = await database.user.findUnique({
        where: { email },
    });
    return user;
}

export async function createUser(email: string, password: string) {
    await database.user.create({
        data: { email, password },
    });
}
