import { conn } from "@/app/libs/mysql";

export const generateShortUrl = async (originalUrl, shortCode) => {
    const result = await conn.query("INSERT INTO url (originalUrl, shortUrl, active) VALUES (?, ?, ?)", [originalUrl, shortCode, true]);

    return result;
};

export const generateShortUrlUser = async (originalUrl, shortCode, userId) => {
    const userUrls = await conn.query("SELECT COUNT(*) AS count FROM url WHERE user_id = ?", [userId]);
    const userUrlsCount = userUrls[0].count;

    if (userUrlsCount >= 12) {
        throw new Error("El usuario ha alcanzado el límite de URLs generadas");
    }

    const result = await conn.query("INSERT INTO url (originalUrl, shortUrl, user_id, active) VALUES (?, ?, ?, ?)", [originalUrl, shortCode, userId, true]);

    return result;
}