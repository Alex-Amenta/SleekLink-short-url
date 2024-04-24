import mysql from "serverless-mysql";

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

export const conn = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: 'mysql06',
        port: 3306,
        database: "urlshortener"
    }
});