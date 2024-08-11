import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const url = await prisma.url.findUnique({
            where: { id },
        })

        if (!url) return NextResponse.json({ message: "URL not found" }, { status: 404 });

        return NextResponse.json(url);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
};

export async function PUT(request, { params }) {
    const { id } = params;
    const { active } = request.json();

    try {
        // const result = await conn.query("UPDATE url SET active = ? WHERE id = ?", [active, id]);

        await prisma.url.update({
            where: { id },
            data: { active }
        });

        return NextResponse.json({ message: active ? 'URL activated successfully' : 'URL desactived successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while deactivating the URL" }, { status: 500 });
    }
}