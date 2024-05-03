import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { userId } = params;

    try {
        const url = await conn.query("SELECT * FROM url WHERE user_id = ?", [userId]);

        if (url.length === 0) return NextResponse.json({ message: "URL not found" }, { status: 404 });

        return NextResponse.json(url);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
};