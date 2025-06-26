import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";
import {auth} from "./auth";

const protectedRoutes = ["/profile/insert", "/post/insert"];

export default async function middleware(request: NextRequest) {
    const session = await auth();

    const {pathname} = request.nextUrl;
    console.log("Middleware triggered on", pathname);

    const isProtected = protectedRoutes.some((route) => 
        pathname.startsWith(route)
    );

    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }

    return NextResponse.next();

}

export const config = {
  matcher: ["/profile/insert/:path*", "/post/insert/:path*"],
};


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default function middleware(request: NextRequest) {
//   console.log("✅ Middleware HIT:", request.nextUrl.pathname);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|.*\\..*).*)"], // match all routes except static
// };
