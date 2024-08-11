import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";
import { nanoid } from "nanoid";
import { isValidUrl } from "../controllers/url/isValidUrlController";
import { generateShortUrl, generateShortUrlUser } from "../controllers/url/shortUrlController";
import { authenticateUser, createAnonymousId } from "../controllers/auth";
import { checkUserOrAnonymousLimits, getExpirationDate, getShortUrl, validateAndCheckDuplicateUrl } from "@/helpers/urls-helpers";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { getOrCreateAnonymousId } from "@/helpers/cookies";

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM url;");
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}

export async function POST(request) {
    const { originalUrl, customDomain, title } = await request.json();

    try {
        const session = await getServerSession(authOptions);

        const userInDb = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        const existingUrl = await validateAndCheckDuplicateUrl(originalUrl);

        if (!existingUrl.success) {
            return { success: false, message: existingUrl.message };
        }

        // Obtener URL corta
        const { shortCode, shortUrl } = await getShortUrl(customDomain);

        // Obtener fecha de expiración
        const expirationDate = await getExpirationDate(session);

        // Obtener o crear ID anónimo
        const anonymousId = session ? null : getOrCreateAnonymousId().value;

        // Verificar límites
        await checkUserOrAnonymousLimits(session, anonymousId);

        // Crear URL
        const createdUrl = await prisma.url.create({
            data: {
                title,
                originalUrl,
                shortCode,
                shortUrl,
                user_id: userInDb?.id,
                anonymous_id: anonymousId,
                expirationDate,
                active: true
            }
        });

        return NextResponse.json(createdUrl, { status: 200 })
    } catch (error) {
        console.log("URL shortening error: ", error);
        return NextResponse.json({ error: "An error occurred while shortening the URL." }, { status: 404 });
    }
}

