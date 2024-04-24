import axios from "axios"
import { NextResponse } from "next/server";

export const isValidUrl = async (originalUrl) => {
    try {
        const response = await axios.head(originalUrl);

        if (response.status !== 200) {
            throw new Error("Invalid URL");
        } else {
            return { status: 200 };
        }

    } catch (error) {
        return NextResponse.json({ message: "Invalid URL" }, { status: 404 });
    }
}