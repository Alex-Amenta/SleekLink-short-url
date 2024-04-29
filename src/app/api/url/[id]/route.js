import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const url = await conn.query("SELECT * FROM url WHERE id = ?", [id]);

        if (url.length === 0) return NextResponse.json({ message: "URL not found" }, { status: 404 });

        return NextResponse.json(url);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
};

export async function DELETE(request, { params }) {
    const { id } = params;
    
    try {
        const result = await conn.query("UPDATE url SET active = ? WHERE id = ?", [false, id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "URL not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "URL deactivated successfully" });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while deactivating the URL" }, { status: 500 });
    }
}