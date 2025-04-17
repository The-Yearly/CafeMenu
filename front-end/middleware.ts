import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
const jwt=require("jsonwebtoken")
export async function middleware(req: NextRequest) {
    const cookiesStore=await cookies()
    const isAdmin=cookiesStore.get("isAdmin")
    const KEY=process.env.NEXT_PUBLIC_SECRET_KEY
    const token=jwt.decode(isAdmin?.value,KEY)
    if(token?.isAdmin!="True"){
        return NextResponse.redirect(new URL("/authentication", req.url));
    }
}

export const config = {
    matcher: "/admin(.*)",
};
