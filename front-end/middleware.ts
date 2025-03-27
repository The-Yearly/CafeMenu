import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function middleware(req: NextRequest) {
    const cookiesStore=await cookies()
    const isAdmin=cookiesStore.get("isAdmin")
    if(isAdmin?.value!="True"){
        return NextResponse.redirect(new URL("/authentication", req.url));
    }
}

export const config = {
  matcher: "/admin/:path",
};
