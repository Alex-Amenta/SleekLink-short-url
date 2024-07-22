import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { urlId } = params;

    if (!urlId) {
        return NextResponse.json({ message: "UrlId is required" }, { status: 404 })
    }

    try {
        const response = await conn.query("SELECT clickedAt FROM clicks WHERE url_id = ? ORDER BY clickedAt DESC", [urlId]);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error getting clicks ${error.message}` }, { status: 500 });
    }
}