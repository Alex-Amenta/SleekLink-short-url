import { conn } from "@/app/libs/mysql";
import { v4 as uuidv4 } from "uuid";

export const createUserGoogle = async (name, email, image) => {
    const userId = uuidv4().substring(0, 32);

    const existingUser = await conn.query("SELECT * FROM user WHERE email = ?", [email]);
    if (existingUser.length === 0) {
        await conn.query("INSERT INTO user (id, name, email, image) VALUES (?, ?, ?, ?)", [userId, name, email, image]);
    }
};