import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request, { params }) {
    const { userId } = params;

    try {
        const user = await conn.query("SELECT * FROM user WHERE id = ?", [userId]);


        if (user.length === 0) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
};

export async function DELETE(request, { params }) {
    const { userId } = params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        await prisma.url.deleteMany({
            where: { user_id: userId }
        });
        await prisma.user.delete({
            where: { id: userId }
        });

        return NextResponse.json({ message: "User and associated urls deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error deleted user:", error);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    const { userId } = params;
    const { name, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { id: userId },
                data: { password_hash: hashedPassword }
            })
        }

        if (name) {
            await prisma.user.update({
                where: { id: userId },
                data: { name: name }
            });
        }

        return NextResponse.json({ message: "User has been updated succesfully" }, { status: 200 })
    } catch (error) {
        console.error("Error editing user:", error);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}