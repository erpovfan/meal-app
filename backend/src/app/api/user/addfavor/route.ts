import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../../lib/mongodb";
import MealUser from "../../../../../models/newModel";
const  JWT_SECRET = process.env.JWT_SECRET || "";
export async function POST(req: Request) {
    await connectToDatabase()
  try {
    
    const cookieStore =  cookies() as any  // بدون await
    const token = cookieStore.get("token")?.value;

if(!token) {
    return NextResponse.json({error : 'there is no token'} , {status:300})
}
const decoded :any = jwt.verify(token , JWT_SECRET)
const uID = decoded?.userId
if (!uID) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { idMeal, strMeal, strMealThumb } = await req.json();

  if (!idMeal || !strMeal || !strMealThumb) {
    return NextResponse.json({ error: "invalid meal data" }, { status: 400 });
  }
  const user = await MealUser.findById(uID)
  if(!user) {
    return NextResponse.json({error : 'user not found'}, {status:404})
  }
 
  const existmeal = user.favorite.some((fav : any) =>fav.idMeal === idMeal)
  if (existmeal) {
    // حذف غذا از favorite
    await MealUser.updateOne(
      { _id: uID },
      { $pull: { favorite: { idMeal } } }
    );
    return NextResponse.json({ message: "meal removed from favorites" }, { status: 300 });
  }else {
    await MealUser.updateOne(
        { _id: uID },
        { $push: { favorite: { idMeal, strMeal, strMealThumb } ,}, }
    )
    return NextResponse.json({ message: "meal added to favorites" }, { status: 200 });
  }



    // اینجا می‌تونی jwt رو verify کنی و ادامه بدی
  } catch (error) {
    console.error(error);
    return NextResponse.json({error : 'error'} , {status:500})
  }
}
