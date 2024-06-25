import mysql from "serverless-mysql";

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

export const conn = mysql({
    config: {
        host: DB_HOST || 'localhost',
        user: DB_USER,
        password: DB_PASSWORD,
        port: 3306,
        database: "urlshortener"
    }
});