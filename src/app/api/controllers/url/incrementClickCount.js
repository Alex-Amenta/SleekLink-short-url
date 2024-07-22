import { conn } from "@/app/libs/mysql";

export const incrementClickCount = async (urlId) => {
    try {
        await conn.query("UPDATE url SET countClick = countClick + 1 WHERE id = ?", [urlId]);

        await conn.query("INSERT INTO clicks (url_id, clickedAt) VALUES (?, NOW())", [urlId]);
    } catch (error) {
        throw new Error(`Error incrementing click count: ${error.message}`);
    }
};