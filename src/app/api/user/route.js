import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";
import { createUserGoogle } from "../controllers/userController";
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
    const userId = uuidv4().substring(0, 32);

    try {
        // Verificar si el correo electrónico tiene un formato válido
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await conn.query("SELECT * FROM user WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
        }

        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Establecer imagen por defecto
        const userImage = image ? image : "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png"

        const result = await conn.query("INSERT INTO user (id, name, email, image, password_hash) VALUES (?, ?, ?, ?, ?)", [userId, name, email, userImage, hashedPassword]);

        if (result.affectedRows === 1) {
            return NextResponse.json({ message: "User created successfully" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

