"use server"

import { getSession } from "next-auth/react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";

export async function getAllUrls() {
    const res = await axios.get(`${BASE_URL}/url`);
    if (res.status !== 200) {
        throw new Error("Error getting all urls")
    }
    console.log(res.data)
    return res.data;
}

export async function createShortUrl(formData, token) {
    const originalUrl = formData.get("originalUrl");
    console.log({ originalUrl });

    if (!originalUrl) return;

    try {

        const res = await axios.post(`${BASE_URL}/url`, { originalUrl }, {
            headers: {
                Authorization: `Bearer ${token}` // Incluir el token JWT en la cabecera de autorización
            }
        });
        if (res.status !== 201) {
            throw new Error("Error creating the url")
        }
        return res
    } catch (error) {
        throw new Error(`Failed created url: ${error.message}`);
    }
}

export async function loginUser(formData, token) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const res = await axios.post(`${BASE_URL}/user`, {email, password});

        if(res.status !== 200) {
            throw new Error('Failed to login');
        }

        const data = res.json();
        console.log(data);
    } catch (error) {
        throw new Error("Error login user:", error);
    }
}