import { NextResponse } from "next/server"
import FAVmodel from "../../../../models/FavoriteUser"
import { connectToDatabase } from "../../../../lib/mongodb"

export async function POST(req:Request) {
    await connectToDatabase()
   try {
    const {idMeal , strMeal , strMealThumb} = await req.json()

    if(!idMeal || !strMeal || !strMealThumb) {
        return NextResponse.json({error: "Missing required fields"}, {status: 400})
    }
    const existMeal = await FAVmodel.find({idMeal})
    if(existMeal.length>0) {
        await FAVmodel.deleteOne({idMeal})
        return NextResponse.json({message:'Meal removed'} , {status:300})
    }
    const newFav = new FAVmodel({
        idMeal ,
        strMeal ,
        strMealThumb
    })
    await newFav.save()
    return NextResponse.json({message: "Meal added to favorites"}, {status: 201})

    
   } catch (error) {
    return NextResponse.json({error:'failed'} , {status:500})
   }
}