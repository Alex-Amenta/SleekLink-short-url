"use server"

import { getSession } from "next-auth/react";

export async function getAllUrls() {

}

export async function createUrl(formData) {
    const session = await getSession();

    console.log("Id del usuario:", session?.user.email);

    const originalUrl = formData.get('originalUrl');
    const userId = session ? session.user.id : null;
    console.log("Original url:", originalUrl);
}

export async function createUserGoogleLogin(formData) {
    
}