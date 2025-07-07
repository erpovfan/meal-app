import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
import MealUser from "../../../../../models/newModel";
import { connectToDatabase } from "../../../../../lib/mongodb";


const  JWT_SECRET = process.env.JWT_SECRET || "";
export async function GET(req:Request) {
    await connectToDatabase()
    try {
        const cookieStore = cookies() as any
    const token = cookieStore.get("token")?.value
const {searchParams} = new URL(req.url)
const idMeal = searchParams.get('idMeal')
    
if (!idMeal) {
    return NextResponse.json({ message: "idMeal is required" }, { status: 400 });
  }
    if(!token) {
        return NextResponse.json({message:'no token'} , {status:300})
    }
    const decoded : any =  Jwt.verify(token , JWT_SECRET)
    const uID = decoded?.userId 
    const existuser = await MealUser.findById(uID)
    if(!existuser) {
        return NextResponse.json({error:'no user'}  , {status:301})

    }
    const existmeal =  existuser.favorite.some((fav :any) => fav.idMeal === idMeal)
    if(existmeal) {
        return NextResponse.json({message : 'ok' , exist : true} , {status:200}) 
    }
    if(!existmeal) {
        return NextResponse.json({message:'ok' , exist : false} ,{status:200} )
    }

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'failed'} , {status:500})
    }

    
}