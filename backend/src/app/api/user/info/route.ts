import { cookies } from "next/headers";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import MealUser from "../../../../../models/newModel";
const JWT_SECRET = process.env.JWT_SECRET || ''

export async function GET(req:Request) {
    await connectToDatabase()
try {
    const cookieStore = cookies() as any
    const token = cookieStore.get("token")?.value
    if (!token) {
        return NextResponse.json({error:'no token'} , {status:300})
    }
    const decoded :any = jwt.verify(token , JWT_SECRET)
    const uId = decoded?.userId 
    const user = await MealUser.findById(uId)
    if (!user) {
        return NextResponse.json({error:'no user'} , {status:300})
    }
    return NextResponse.json({message:'ok' , user} , {status:200})


} catch (error) {
    return NextResponse.json({error:'error'} , {status:400})
    
}
}