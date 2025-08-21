import { describe, it, expect } from 'vitest';

import { generateToken, verifyToken } from '../../../src/utils/token';

describe('Token', () => {
    describe('generateToken', () => {
        it('should return a token', () => {
            const userId = 1;
            const token = generateToken(userId);
            expect(token).toBeDefined();
        });

        it('should return a token with the correct userId', () => {
            const userId = 1;
            const token = generateToken(userId);
            const decoded = verifyToken(token);
            expect(decoded.id).toBe(userId);
        });
    });

    describe('verifyToken', () => {
        it('should return a decoded token', () => {
            const token = generateToken(1);
            const decoded = verifyToken(token);
            expect(decoded).toBeDefined();
        });

        it('should throw an error if the token is invalid', () => {
            const token = 'invalid.token';

            expect(() => verifyToken(token)).toThrow();
        });
    });
});
