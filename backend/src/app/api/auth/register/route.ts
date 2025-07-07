import { NextResponse } from "next/server";

import bcrypt from 'bcryptjs'


import { connectToDatabase } from "../../../../../lib/mongodb";
import MealUser from "../../../../../models/newModel";
export async function POST(req :Request) {
    await connectToDatabase()
    try {
        const {username , email , password , role} = await req.json()
        if(!username || !email || !password || !role) {
           return NextResponse.json({message : 'there is no enough data of u my little bro'} , {status:400})
        }
        const userExist = await MealUser.findOne({email})
        if(userExist) {
           return NextResponse.json({message : 'the user is already exist'} , {status:401})
        }

const hashedPass = await bcrypt.hash(password , 10)
const newUser = new MealUser({
    username :username, 
    email : email , 
    password : hashedPass , 
    role : role , 
    favorite : [] ,
    created_at :new Date()
    
})
await newUser.save()
return NextResponse.json({message : 'saved'} , {status:200})

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'failed'} , {status:500})
      
        
    }

}


export async function GET() {
return NextResponse.json({message : 'hey , you are hereeee'} , {status : 200})
}