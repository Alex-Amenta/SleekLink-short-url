import { conn } from "@/app/libs/mysql";

export const generateShortUrl = async (originalUrl, shortCode) => {
    const result = await conn.query("INSERT INTO url (originalUrl, shortUrl) VALUES (?, ?)", [originalUrl, shortCode]);

    return result;
};