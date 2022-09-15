import { throwCustomError } from '../errors/throwErrors';
import { cryptsPassword } from '../utils/cryptographyData';

import * as authInterface from '../interfaces/authIntefaces';
import * as authRepository from '../repositories/authRepository';

export async function login() {}

export async function createUser(user: authInterface.ISignInData) {
    const userData = await authRepository.findUserEmail(user.email);

    if (!userData) {
        throw throwCustomError('conflict', 'This e-mail has already been registered');
    }

    const encryptedPassword = cryptsPassword(user.password);
    await authRepository.createUser(user.email, encryptedPassword);
}