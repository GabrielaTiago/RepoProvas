import { throwCustomError } from '../errors/throwErrors';
import { cryptsPassword } from '../utils/cryptographyData';

import * as authInterface from '../interfaces/authIntefaces';
import * as authRepository from '../repositories/authRepository';

export async function login() {}

export async function createUser(user: authInterface.ISignUpData) {
    const email = await authRepository.findUserEmail(user.email);

    if (email) {
        throw throwCustomError('conflict', 'This e-mail has already been registered');
    }
    if (user.password !== user.confirmPassword){
        throw throwCustomError('unprocessable_entity', 'The passwords do not match');
    }
    const encryptedPassword = cryptsPassword(user.password);
    await authRepository.createUser(user.email, encryptedPassword);
}