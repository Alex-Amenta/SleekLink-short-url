import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";
import { nanoid } from "nanoid";
import { isValidUrl } from "../controllers/isValidUrlController";
import { generateShortUrl } from "../controllers/shortUrlController";

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM url;");
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}

export async function POST(request) {
    const { originalUrl } = await request.json();

    const shortCode = nanoid(6);

    try {
        if (!originalUrl) return NextResponse.json({ message: "Url is required" }, { status: 404 });

        // Validar la URL
        const isValid = await isValidUrl(originalUrl);
        if (isValid.status === 404) return isValid;

        //Evitar duplicados
        const existingUrl = await conn.query("SELECT * FROM url WHERE originalUrl = ?", [originalUrl]);

        if (existingUrl.length > 0) return NextResponse.json({ message: "This URL has already shortened" }, { status: 400 });

        const shortUrl = await generateShortUrl(originalUrl, shortCode);

        if (shortUrl.affectedRows === 1) {
            const shortUrl = `https://fastUrl/${shortCode}`;
            return NextResponse.json({ shortUrl }, { status: 201 });
        } else {
            return NextResponse.json({ error: "Could not shorten the URL. Try again later." }, { status: 404 });
        };

    } catch (error) {
        console.log("URL shortening error: ", error);
        return NextResponse.json({ error: "An error occurred while shortening the URL." }, { status: 404 });
    }
}

