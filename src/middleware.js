
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
// import { getZustandState } from "./zustand/store";

export const middleware = async (req) => {
    const session = await getSession({ req });

    if (session) { return NextResponse.next(); }

    // const zustandState = getZustandState();
    // if (zustandState.user) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url))

}

export const config = { matcher: [] }