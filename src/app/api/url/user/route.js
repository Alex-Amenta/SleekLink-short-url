import { conn } from "@/app/libs/mysql";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const urls = await prisma.url.findMany({
            where: { user: { email: email } }
        });
        return NextResponse.json(urls, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}