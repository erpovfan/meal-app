import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import FAVmodel from "../../../../models/FavoriteUser";

export async function GET(req:Request) {
    await connectToDatabase()
    try {
        const favors = await FAVmodel.find()
        return NextResponse.json({message:'all favors are here' , favors} , {status:200})
    } catch (error) {
        return NextResponse.json({error : 'failed' }, {status:500})
    }
}