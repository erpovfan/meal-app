import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import FAVmodel from "../../../../models/FavoriteUser";

export async function GET(req:Request) {
    await connectToDatabase()

    try {
    const {searchParams} = new URL(req.url)
    const idMeal = searchParams.get('idMeal')

    const found = await FAVmodel.findOne({idMeal})

    if(found) {
        return NextResponse.json({exist : true } , {status:200})
    }
    if(!found) {
        return NextResponse.json({exist : false } , {status:200})
    }
    } catch (error) {
        return NextResponse.json({error:'error'} , {status:500})
        
    }
}