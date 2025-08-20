import { throwCustomError } from '../errors/throwCustomError';
import { ISignInData, ISignUpData } from '../interfaces/authInterfaces';
import * as userRepository from '../repositories/userRepository';
import { cryptsPassword, validatePassword } from '../utils/cryptographyData';
import { generateToken } from '../utils/token';

export async function login(userData: ISignInData) {
    const user = await userRepository.findUserByEmail(userData.email);
    const validEmail = user?.email;
    const validPassword = user?.password as string;
    if (!validEmail || !validatePassword(userData.password, validPassword))
        throw throwCustomError('forbidden', 'Incorrect email and/or password');
    return generateToken(user.id);
}

export async function createUser(userData: ISignUpData) {
    const user = await userRepository.findUserByEmail(userData.email);
    if (user) throw throwCustomError('conflict', 'This email has already been registered');
    const encryptedPassword = cryptsPassword(userData.password);
    await userRepository.createUser(userData.email, encryptedPassword);
}
