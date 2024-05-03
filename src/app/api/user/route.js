import { conn } from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";
import { createUserGoogle } from "../controllers/userController";

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
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Verificar si el correo electrónico tiene un formato válido
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await conn.query("SELECT * FROM user WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
        }

        let result;
        if (password) {
            result = await conn.query("INSERT INTO user (id, name, email, password_hash) VALUES (?, ?, ?, ?)", [userId, name, email, password]);
        } else {
            // Si no se proporciona una contraseña, almacenar la información del usuario sin contraseña en la base de datos
            result = await createUserGoogle(name, email, image);
        }

        // Verificar si el usuario se creó exitosamente
        if (result.affectedRows === 1) {
            return NextResponse.json({ message: "User created successfully" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

