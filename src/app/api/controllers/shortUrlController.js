import { conn } from "@/app/libs/mysql";

const MAX_URLS_UNAUTHENTICATED = 5;
const MAX_URLS_PER_USER = 12;

export const generateShortUrl = async (originalUrl, shortCode, shortUrl, anonymousId) => {
    const anonymousUrls = await conn.query("SELECT COUNT(*) AS count FROM url WHERE user_id IS NULL AND anonymous_id = ?", [anonymousId]);
    const anonymousUrlsCount = anonymousUrls[0].count;

    if (anonymousUrlsCount >= MAX_URLS_UNAUTHENTICATED) {
        throw new Error("Se ha alcanzado el límite de URLs generadas para usuarios no autenticados");
    }

    const result = await conn.query("INSERT INTO url (originalUrl, shortCode, shortUrl, anonymous_id, active) VALUES (?, ?, ?, ?, true)", [originalUrl, shortCode, shortUrl, anonymousId]);

    return result;
};

export const generateShortUrlUser = async (originalUrl, shortCode, shortUrl, userId) => {
    const userUrls = await conn.query("SELECT COUNT(*) AS count FROM url WHERE user_id = ?", [userId]);
    const userUrlsCount = userUrls[0].count;

    if (userUrlsCount >= MAX_URLS_PER_USER) {
        throw new Error("El usuario ha alcanzado el límite de URLs generadas");
    }

    const result = await conn.query("INSERT INTO url (originalUrl, shortCode, shortUrl, user_id, active) VALUES (?, ?, ?, ?)", [originalUrl, shortCode, shortUrl, userId, true]);

    return result;
}