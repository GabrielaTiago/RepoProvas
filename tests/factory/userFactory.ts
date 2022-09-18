import { faker } from '@faker-js/faker';
import generator from 'generate-password';

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

export async function __creteUser() {
    const password = await __createPassword();

    const user = {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password,
    };

    return user;
}