export const checkAndUpdateUrls = async () => {
    const expirationsUrls = await conn.query("SELECT id FROM url WHERE active = true AND expirationDate <= NOW()");

    for (const url of expirationsUrls) {
        await conn.query("UPDATE url SET active = false WHERE id = ?", [url.id]);
    }

    const deletetionDate = new Date();
    deletetionDate.setDate(deletetionDate.getDate() - 10);
    await conn.query("DELETE FROM url WHERE active = false AND expirationDate <= ?", [deletetionDate]);
};