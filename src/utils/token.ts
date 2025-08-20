import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JWTPayload {
    id: number;
}

function generateToken(userId: number) {
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '4h' });
    return token;
}

function verifyToken(token: string) {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
}

export { generateToken, verifyToken };
