import { getUrlByShortUrl } from "@/app/api/controllers/url/getUrlByShortUrl";
import { incrementClickCount } from "@/app/api/controllers/url/incrementClickCount";
import { NextResponse } from "next/server";

const { NEXTAUTH_URL } = process.env

export async function GET(request, { params }) {
    const { shortCode } = params;

    try {
        const urlData = await getUrlByShortUrl(shortCode);

        if (!urlData) {
            return NextResponse.json({ message: "Url not found" }, { status: 404 });
        }

        if (!urlData.active) {
            return NextResponse.redirect(`${NEXTAUTH_URL}/url-inactive`, 302);
        }

        await incrementClickCount(urlData.id);

        return NextResponse.redirect(urlData.originalUrl, 302);
    } catch (error) {
        return NextResponse.json({ error: `An error occurred while redirecting the URL: ${error.message}` }, { status: 500 });
    }
}