import { faker } from '@faker-js/faker';
import { database } from 'src/database/postgres';
import { generateToken } from 'src/utils/token';

import { ISignInData } from '../../src/interfaces/authInterfaces';
import { cryptsPassword } from '../../src/utils/cryptographyData';

function __generatePassword(): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const special = '!@#$%&*()_+-=[]{};:,.<>?';
    const numbers = '0123456789';

    let password = '';
    password += faker.helpers.arrayElement(lowercase.split(''));
    password += faker.helpers.arrayElement(uppercase.split(''));
    password += faker.helpers.arrayElement(special.split(''));
    password += faker.helpers.arrayElement(numbers.split(''));

    // Fill remaining 10 characters with random chars
    const allChars = (lowercase + uppercase + special + numbers).split('');
    for (let i = 0; i < 10; i++) {
        password += faker.helpers.arrayElement(allChars);
    }

    // Shuffle the password
    return password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
}

export async function __createSession(user: ISignInData) {
    const userSession = {
        email: user.email,
        password: user.password,
    };
    return userSession;
}

export function __createAuthData() {
    const password = __generatePassword();
    return {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password,
    };
}

export function __createMockUser(email?: string, password?: string) {
    return {
        id: faker.number.int({ min: 1, max: 1000 }),
        email: email || faker.internet.email(),
        password: password || __generatePassword(),
        createdAt: faker.date.recent(),
    };
}

export async function __createUser() {
    const password = __generatePassword();
    const user = await database.user.create({
        data: {
            email: faker.internet.email(),
            password: cryptsPassword(password),
        },
    });
    return { ...user, password };
}

export async function __createUserAndToken() {
    const user = await __createUser();
    const token = generateToken(user.id);
    return { user, token };
}
