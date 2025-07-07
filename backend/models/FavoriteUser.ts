import mongoose, { Document , Schema , model } from "mongoose";
interface IFAVINTER {
    idMeal : string ,
    strMeal : string  , 
    strMealThumb :string

}
 const FavScema = new Schema<IFAVINTER>({
    idMeal: { type: String  , required:true},
    strMeal: { type: String , required:true },
    strMealThumb: { type: String  , required:true},

})

const FAVmodel = mongoose.models['FavMeal'] || mongoose.model<IFAVINTER>('FavMeal' , FavScema)
export default FAVmodel