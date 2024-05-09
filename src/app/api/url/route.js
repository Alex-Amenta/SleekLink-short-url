import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";
import { nanoid } from "nanoid";
import { isValidUrl } from "../controllers/isValidUrlController";
import { generateShortUrl, generateShortUrlUser } from "../controllers/shortUrlController";
import jwt from "jsonwebtoken"

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM url;");
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}

export async function POST(request) {
    const { originalUrl} = await request.json();

    const shortCode = nanoid(6);
    const shortUrl = `https://fastUrl/${shortCode}`;
    const secretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

    try {
        if (!originalUrl) return NextResponse.json({ message: "Url is required" }, { status: 404 });

        // Obtener el token JWT de la cabecera de autorización
        const token = request.headers.authorization;

        // Verificar si el token JWT existe antes de intentar decodificarlo
        if (!token) {
            return NextResponse.json({ message: "Authorization token is required" }, { status: 401 });
        }

        // Verificar y decodificar el token JWT
        const decodedToken = jwt.verify(token.replace('Bearer ', ''), secretKey);

        // Obtener el ID del usuario del token decodificado
        const userId = decodedToken.userId;

        // Validar la URL
        const isValid = await isValidUrl(originalUrl);
        if (isValid.status === 404) return isValid;

        //Evitar duplicados
        const existingUrl = await conn.query("SELECT * FROM url WHERE originalUrl = ?", [originalUrl]);
        if (existingUrl.length > 0) return NextResponse.json({ message: "This URL has already shortened" }, { status: 400 });

        const result = await generateShortUrlUser(originalUrl, shortCode, userId);

        if (result.affectedRows === 1) {
            return NextResponse.json({ shortUrl }, { status: 201 });
        } else {
            return NextResponse.json({ error: "Could not shorten the URL. Try again later." }, { status: 500 });
        }
    } catch (error) {
        console.log("URL shortening error: ", error);
        return NextResponse.json({ error: "An error occurred while shortening the URL." }, { status: 404 });
    }
}

