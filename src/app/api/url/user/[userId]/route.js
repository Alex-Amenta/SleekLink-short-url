import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { userId } = params;
    try {
        const res = await conn.query("SELECT * FROM url WHERE user_id = ?", [userId]);
        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}