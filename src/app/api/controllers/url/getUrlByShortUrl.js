import { conn } from "@/app/libs/mysql";

export const getUrlByShortUrl = async (shortCode) => {
    const result = await conn.query("SELECT * FROM url WHERE shortCode = ?", [shortCode]);
    return result[0];
};