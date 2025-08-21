import bcrypt from 'bcrypt';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { cryptsPassword, validatePassword } from '../../../src/utils/cryptographyData';

vi.mock('bcrypt');

describe('Cryptography Utils', () => {
    const password = 'mySecretPassword123';
    const hashedPassword = 'a_hashed_password_string';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('cryptsPassword', () => {
        it('should call bcrypt.hashSync and return the encrypted password', () => {
            vi.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword);

            const result = cryptsPassword(password);

            expect(bcrypt.hashSync).toHaveBeenCalledWith(password, expect.any(Number));
            expect(result).toBe(hashedPassword);
        });
    });

    describe('validatePassword', () => {
        it('should return true if the passwords match', () => {
            vi.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

            const result = validatePassword(password, hashedPassword);

            expect(bcrypt.compareSync).toHaveBeenCalledWith(password, hashedPassword);
            expect(result).toBe(true);
        });

        it('should return false if the passwords do not match', () => {
            vi.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

            const result = validatePassword(password, 'wrong_hashed_password');

            expect(bcrypt.compareSync).toHaveBeenCalledWith(password, 'wrong_hashed_password');
            expect(result).toBe(false);
        });
    });

});
