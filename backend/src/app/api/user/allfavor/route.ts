import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken"; 
import { connectToDatabase } from "../../../../../lib/mongodb";
import MealUser from "../../../../../models/newModel";

const  JWT_SECRET = process.env.JWT_SECRET || "";
export async function GET(req:Request) {
   await connectToDatabase()

   try {
    
    const cookieStore = cookies() as any
    const token = cookieStore.get("token")?.value

    if(!token) {
        return NextResponse.json({error : 'there is no token'} , {status:300})
    }

    const decoded : any = Jwt.verify(token , JWT_SECRET)
    const uID = decoded?.userId

    if(!uID) {
        return NextResponse.json({error : 'there is no user id'} , {status:300})
    }

    const user = await MealUser.findById(uID)
    if(!user) {
        return NextResponse.json({error : 'there is no user'} , {status:300})
    }

    const allfavor = user.favorite 

    return NextResponse.json({message: 'all favor is here' , allfavor} , {status:200})

   } catch (error) {
    console.log(error)
    return NextResponse.json({error : "error"} , {status:500})
    
   }
}