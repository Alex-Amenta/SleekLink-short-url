
import prisma from "@/lib/prisma";
import axios from "axios";
import { nanoid } from "nanoid";

const BASE_URL = process.env.BASE_URL;
const MAX_URLS_PER_ANONYMOUS = 5;
const MAX_URLS_PER_USER = 15;

export const formatValidUrl = async (originalUrl) => {
    try {
        const response = await axios.head(originalUrl);

        return response.status

    } catch (error) {
        return false;
    }
}

export const validateAndCheckDuplicateUrl = async (originalUrl) => {
    const isValid = await formatValidUrl(originalUrl);
    if (!isValid) throw new Error("Url no valida!");

    //evitamos duplicados
    const existingUrl = await prisma.url.findFirst({
        where: { originalUrl: originalUrl }
    });

    if (existingUrl) return { success: false, message: "Esta url ya fue acortada" };

    return { success: true };
};

export const getShortUrl = async (customDomain) => {
    if (customDomain) {
        const existingCustomDomain = await prisma.url.findUnique({
            where: { shortCode: customDomain }
        });

        if (existingCustomDomain) return { success: false, message: "Este dominio personalizado ya existe" };

        return {
            shortCode: customDomain,
            shortUrl: `${BASE_URL}/${customDomain}`
        };
    }

    const shortCode = nanoid(6);
    return {
        shortCode,
        shortUrl: `${BASE_URL}/${shortCode}`
    };
};

export const getExpirationDate = async (session) => {
    const expirationDate = new Date();
    if (session) {
        expirationDate.setDate(expirationDate.getDate() + 30);
    } else {
        expirationDate.setHours(expirationDate.getHours() + 5);
    }
    return expirationDate;
};

export const checkUserOrAnonymousLimits = async (session, anonymousId) => {
    let count;
    if (session) {
        count = await prisma.url.count({ where: { user_id: session.user.id } });
        if (count >= MAX_URLS_PER_USER) return { success: false, message: "Alcanzaste el limite urls generadas." };
    } else {
        count = await prisma.url.count({ where: { anonymous_id: anonymousId } });
        if (count >= MAX_URLS_PER_ANONYMOUS) return { success: false, message: "Alcanzaste el limite urls generadas." };
    }
}