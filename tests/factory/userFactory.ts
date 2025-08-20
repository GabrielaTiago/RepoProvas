import { faker } from '@faker-js/faker';
import generator from 'generate-password';

import { ISignInData } from '../../src/interfaces/authInterfaces';

export async function __createEmail() {
    const email: string = faker.internet.email();

    return email;
}

export async function __createPassword() {
    const password: string = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        strict: true,
    });

    return password;
}

export async function __createUser() {
    const password = await __createPassword();
    const email = await __createEmail();

    const user = {
        email: email,
        password: password,
        confirmPassword: password,
    };

    return user;
}

export async function __createSession(user: ISignInData) {
    const userSession = {
        email: user.email,
        password: user.password,
    };

    return userSession;
}
