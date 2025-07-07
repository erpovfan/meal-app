import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req:Request) {

   try {
    const cookieStore = cookies() as any

    cookieStore.set("token", "" , {
        httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0), 
      
    })

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
   } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
   }
}