import { NextResponse } from "next/server";

export function proxy(req) {
    // Optimistic redirect only; the dashboard page verifies the session with the API.
    const token = req.cookies.get("access_token")?.value;

    if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
        const loginUrl = new URL("/user/login", req.url);
        loginUrl.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
