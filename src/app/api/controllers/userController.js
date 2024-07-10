import { conn } from "@/app/libs/mysql";
import { v4 as uuidv4 } from "uuid";

export const createUserGoogle = async (name, email, image) => {
  try {
    const existingUser = await conn.query("SELECT * FROM user WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      console.log("Existe el usuario:" + existingUser[0].id);
      return existingUser[0].id;
    }

    const userId = uuidv4().substring(0, 32);
    await conn.query("INSERT INTO user (id, name, email, image) VALUES (?, ?, ?, ?)", [userId, name, email, image]);

    return userId;
  } catch (error) {
    console.error("Error during createUserGoogle:", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  const user = await conn.query("SELECT * FROM user WHERE email = ?", [email]);

  if (user.length === 0) {
    throw new Error("User not found");
  }

  return user[0];
};