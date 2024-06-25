import { NextResponse } from "next/server";
import { getUserByEmail } from "../../controllers/userController";
import bcrypt from "bcrypt";
import { generateJwt, verifyJwt } from "@/helpers/authentication";

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

        return NextResponse.json({...userData, token}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}