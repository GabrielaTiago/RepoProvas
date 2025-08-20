import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { throwCustomError } from '../errors/throwErrors';
import * as authInterface from '../interfaces/authIntefaces';
import * as authRepository from '../repositories/authRepository';
import { cryptsPassword, validatePassword } from '../utils/cryptographyData';

dotenv.config();

export async function login(user: authInterface.ISignInData) {
    const userData = await authRepository.findUserEmail(user.email);
    const validEmail = userData?.email;
    const validPassword = userData?.password as string;

    if (!validEmail || !validatePassword(user.password, validPassword)) {
        throw throwCustomError('forbidden', 'Incorrect email and/or password');
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    return token;
}

export async function createUser(user: authInterface.ISignUpData) {
    const email = await authRepository.findUserEmail(user.email);

    if (email) {
        throw throwCustomError('conflict', 'This e-mail has already been registered');
    }
    if (user.password !== user.confirmPassword) {
        throw throwCustomError('unprocessable_entity', 'The passwords do not match');
    }
    const encryptedPassword = cryptsPassword(user.password);
    await authRepository.createUser(user.email, encryptedPassword);
}
