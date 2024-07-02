import { conn } from "@/app/libs/mysql";

export const incrementClickCount = async (urlId) => {
    await conn.query("UPDATE url SET countClick = countClick + 1 WHERE id = ?", [urlId]);
};