import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// Expresión regular para validar el formato del correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
    try {
        const result = await conn.query("SELECT * FROM user;");
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}

export async function POST(request) {
    const { name, email, image, password } = await request.json();

    try {
        // Verificar si el correo electrónico tiene un formato válido
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (existingUser) {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
        }

        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //creamos el usuario
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                image: image || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png",
                password_hash: hashedPassword
            }
        })


        return NextResponse.json({ message: "User created successfully", data: newUser }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

