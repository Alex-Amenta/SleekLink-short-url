import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import crypto from 'crypto';

export async function authenticateUser(request) {
    // Lógica para autenticar al usuario
    const token = request.headers.authorization;
    const secretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';
    let userId = null;

    if (token) {
        try {
            const decodedToken = jwt.verify(token.replace('Bearer ', ''), secretKey);
            userId = decodedToken.userId;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    return userId;
}

export async function createAnonymousId(request) {
    // Lógica para crear un ID anónimo y manejar cookies
    // Verificar o crear un identificador anónimo
    const cookies = request.headers.get('cookie');
    const parsedCookies = Object.fromEntries(cookies.split('; ').map(cookie => cookie.split('=')));
    let anonymousId = null;

    if (parsedCookies.anonymousId) {
        anonymousId = parsedCookies.anonymousId;
    } else {
        anonymousId = crypto.randomUUID();
        const cookieHeader = serialize('anonymousId', anonymousId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
        });

        return { anonymousId, cookieHeader };
    }

    return { anonymousId };
}