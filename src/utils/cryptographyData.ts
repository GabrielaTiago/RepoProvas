import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export function cryptsPassword(password: string) {
    const salt: number = Number(process.env.HASH_ROUNDS);
    const encryptedPassword: string = bcrypt.hashSync(password, salt);
    return encryptedPassword;
}