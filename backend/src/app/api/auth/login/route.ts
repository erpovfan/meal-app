import { NextResponse } from "next/server";
    
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { connectToDatabase } from "../../../../../lib/mongodb";
import AiUserModel from "../../../../../models/Aiuser";
import MealUser from "../../../../../models/newModel";
const JWT_SECRET = process.env.JWT_SECRET || ''
export async function POST(req:Request) {
    await connectToDatabase()
    try {
        const {email , password} = await req.json()
        if(!email || !password) {
            return NextResponse.json({message :'not enough data'}, {status:300})
        }
        const userExist = await MealUser.findOne({email})

        if(!userExist) {
            return NextResponse.json({message : 'not exists'} , {status:301})
        }
        const passtest =await bcrypt.compare(password , userExist.password)

        if(!passtest) {
            return NextResponse.json({message:'not matched'} , {status:302})
        }
        const token = jwt.sign(
            {userId : userExist._id , userEmail : userExist.email , userRole : userExist.role} , 
            JWT_SECRET , 
            {expiresIn : '1h'}
        )
        const res =  NextResponse.json({message : 'ok' , token} , {status :200})
        res.cookies.set("token" , token , {
            httpOnly : true , 
            path : "/" , 
            secure : process.env.NODE_ENV === 'production' , 
            maxAge : 3600000 ,
        })
return res
      
    } catch (error) {
return NextResponse.json({message : 'failed'} , {status : 500})
        
    }
}



export async function GET() {
    return NextResponse.json({message : 'ok'})
}