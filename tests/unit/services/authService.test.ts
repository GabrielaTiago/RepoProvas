import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as userRepository from '../../../src/repositories/userRepository';
import * as authServices from '../../../src/services/authServices';
import * as cryptography from '../../../src/utils/cryptographyData';
import * as token from '../../../src/utils/token';
import { __createMockUser, __createAuthData } from '../../factory/userFactory';

vi.mock('../../../src/repositories/userRepository');
vi.mock('../../../src/utils/cryptographyData');

describe('Auth Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('login', () => {
        it('should login a user with valid credentials', async () => {
            const { email, password } = __createAuthData();
            const user = __createMockUser(email, password);
            const fakeToken = 'fake.jwt.token';

            vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(user);
            vi.spyOn(cryptography, 'validatePassword').mockReturnValue(true);
            vi.spyOn(token, 'generateToken').mockReturnValue(fakeToken);

            const result = await authServices.login({ email, password });

            expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
            expect(cryptography.validatePassword).toHaveBeenCalledWith(password, user.password);
            expect(token.generateToken).toHaveBeenCalledWith(user.id);
            expect(result).toBe(fakeToken);
        });

        it('should throw an error if the email is not found', async () => {
            const { email, password } = __createAuthData();

            vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);

            await expect(authServices.login({ email, password })).rejects.toThrow('Incorrect email and/or password');
            expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
            expect(cryptography.validatePassword).not.toHaveBeenCalled();
            expect(token.generateToken).not.toHaveBeenCalled();
        });

        it('should throw an error if the password is incorrect', async () => {
            const { email, password } = __createAuthData();
            const user = __createMockUser(email, password);

            vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(user);
            vi.spyOn(cryptography, 'validatePassword').mockReturnValue(false);

            await expect(authServices.login({ email, password })).rejects.toThrow('Incorrect email and/or password');
            expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
            expect(cryptography.validatePassword).toHaveBeenCalledWith(password, user.password);
            expect(token.generateToken).not.toHaveBeenCalled();
        });
    });

    describe('createUser', () => {
        it('should create a new user with valid credentials', async () => {
            const { email, password, confirmPassword } = __createAuthData();
            const encryptedPassword = 'hashedPassword123$';

            vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);
            vi.spyOn(cryptography, 'cryptsPassword').mockReturnValue(encryptedPassword);
            vi.spyOn(userRepository, 'createUser').mockResolvedValue(undefined);

            await authServices.createUser({ email, password, confirmPassword });

            expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
            expect(cryptography.cryptsPassword).toHaveBeenCalledWith(password);
            expect(userRepository.createUser).toHaveBeenCalledWith(email, encryptedPassword);
        });

        it('should throw an error if the email is already in use', async () => {
            const { email, password, confirmPassword } = __createAuthData();
            const existingUser = __createMockUser(email, password);

            vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(existingUser);

            await expect(authServices.createUser({ email, password, confirmPassword })).rejects.toThrow(
                'This email has already been registered'
            );
            expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
            expect(userRepository.createUser).not.toHaveBeenCalled();
        });
    });
});
