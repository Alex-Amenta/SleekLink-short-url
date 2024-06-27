import { NextResponse } from "next/server";
import { getUserByEmail } from "../../controllers/userController";
import bcrypt from "bcrypt";
import { generateJwt, verifyJwt } from "@/helpers/authentication";
import { serialize } from "cookie";

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const user = await getUserByEmail(email);
        const userData = JSON.parse(JSON.stringify(user));

        if (!userData || !password) {
            return NextResponse.json({ message: "Incompleted email or password" }, { status: 404 });
        }
        // Comparar la contraseña proporcionada con la contraseña almacenada utilizando bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, userData.password_hash);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = await generateJwt({ email, userId: userData.id });

        const response = NextResponse.json({ ...userData, token }, { status: 200 });

        response.headers.set("Set-Cookie", serialize("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
            path: "/"
        }));

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}