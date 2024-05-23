import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";
import { nanoid } from "nanoid";
import { serialize } from "cookie";
import crypto from "crypto";
import { isValidUrl } from "../controllers/isValidUrlController";
import { generateShortUrl, generateShortUrlUser } from "../controllers/shortUrlController";
import jwt from "jsonwebtoken"
import { authenticateUser, createAnonymousId } from "../controllers/auth";

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM url;");
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}

export async function POST(request) {
    const { originalUrl, customDomain } = await request.json();

    try {
        if (!originalUrl) {
            return NextResponse.json({ message: "Url is required" }, { status: 404 });
        }

        const userId = await authenticateUser(request);
        const { anonymousId } = await createAnonymousId(request);

        // Validar la URL
        const isValid = await isValidUrl(originalUrl);
        if (isValid.status === 404) return isValid;

        // Evitar duplicados
        const existingUrl = await conn.query("SELECT * FROM url WHERE originalUrl = ?", [originalUrl]);
        if (existingUrl.length > 0) {
            return NextResponse.json({ message: "This URL has already been shortened" }, { status: 400 });
        }

        let shortCode;
        let shortUrl;

        if (customDomain) {
            const existingCustomDomain = await conn.query("SELECT * FROM url WHERE shortCode = ?", [customDomain]);
            if (existingCustomDomain.length > 0) {
                return NextResponse.json({ message: "This custom domain is already in use" }, { status: 400 });
            }

            shortCode = customDomain;
            shortUrl = `https://${customDomain}`;
        } else {
            shortCode = nanoid(6);
            shortUrl = `https://fastUrl/${shortCode}`;
        }

        let result;

        if (userId) {
            result = await generateShortUrlUser(originalUrl, shortCode, shortUrl, userId);
        } else {
            result = await generateShortUrl(originalUrl, shortCode, shortUrl, anonymousId);
        }

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

