import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(req:NextRequest){
    let token=null;
    try {
        token=await getToken({req,secret:"rah123rahul="});

        
    } catch (error) {
        console.log("error",error)
        
    }
    if(token && req.nextUrl.pathname==="/"){
        return NextResponse.redirect(new URL('/dashboard',req.url));

    }
    if(token && req.nextUrl.pathname==="/auth/signup"){
        return NextResponse.redirect(new URL('/dashboard',req.url));

    }
     if(!token && req.nextUrl.pathname.startsWith("/dashboard")){
        return NextResponse.redirect(new URL("/",req.url));


    }
       return NextResponse.next();
}
export const config={
    matcher:["/","/auth/signup","/dashboard/:path*"],
}
