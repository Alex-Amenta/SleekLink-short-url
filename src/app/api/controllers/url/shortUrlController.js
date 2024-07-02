import { conn } from "@/app/libs/mysql";

const MAX_URLS_UNAUTHENTICATED = 5;
const MAX_URLS_PER_USER = 15;

export const generateShortUrl = async (title, originalUrl, shortCode, shortUrl, anonymousId) => {
    const anonymousUrls = await conn.query("SELECT COUNT(*) AS count FROM url WHERE user_id IS NULL AND anonymous_id = ?", [anonymousId]);
    const anonymousUrlsCount = anonymousUrls[0].count;

    if (anonymousUrlsCount >= MAX_URLS_UNAUTHENTICATED) {
        throw new Error("Se ha alcanzado el límite de URLs generadas para usuarios no autenticados");
    }

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 5);

    const result = await conn.query("INSERT INTO url (title ,originalUrl, shortCode, shortUrl, anonymous_id, active, expirationDate) VALUES (?, ?, ?, ?, ?, true, ?)", [title, originalUrl, shortCode, shortUrl, anonymousId, expirationDate]);

    return result;
};

export const generateShortUrlUser = async (title, originalUrl, shortCode, shortUrl, userId) => {
    const userUrls = await conn.query("SELECT COUNT(*) AS count FROM url WHERE user_id = ?", [userId]);
    const userUrlsCount = userUrls[0].count;

    if (userUrlsCount >= MAX_URLS_PER_USER) {
        throw new Error("El usuario ha alcanzado el límite de URLs generadas");
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    console.log(expirationDate);

    const result = await conn.query("INSERT INTO url (title ,originalUrl, shortCode, shortUrl, user_id, active, expirationDate) VALUES (?, ?, ?, ?, ?, true, ?)", [title, originalUrl, shortCode, shortUrl, userId, expirationDate]);

    return result;
}