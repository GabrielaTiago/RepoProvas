import { database } from '../database/postgres';

export async function findUserEmail(userEmail: string) {
    const email = await database.user.findUnique({
        where: {
            email: userEmail
        },
    });
    return email;
}

export async function createUser(userEmail: string, userPassword: string) {
    await database.user.create({
        data: {
            email: userEmail,
            password: userPassword
        },
    });
}

export async function confirmPassword() {}
