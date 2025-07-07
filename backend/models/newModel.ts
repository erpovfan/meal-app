import mongoose, { Document , Schema , model } from "mongoose";

interface Ifavorite {
    idMeal : string , 
    strMeal : string , 
    strMealThumb : string ,
}


interface INEWMODEL extends Document {
    username : string , 
    email : string ,
    password : string ,
    role?: 'user' | 'admin' , 
    favorite : Ifavorite[] , 
    created_at : Date
    


}


 const newSchema = new Schema<INEWMODEL>({
    username : {
        type : String,
        required : true , 
        
    } , 
    email : {
        type : String ,
        required : true ,
        unique : true ,
        lowercase:true
    } , 
    password : {
        type : String ,
        required : true ,

    } , 
    role : {
        type : String ,
        required : true ,
        enum : ["admin" , "user"] , 
        default : 'user'

    } , 

    favorite : [
        {
idMeal : {
    type :String , 
    required : true ,

} , 
strMeal : {
    type : String ,
    required : true ,
} , 
strMealThumb : {
    type : String ,
    required : true ,
}
        }
    ] ,
    created_at : {
        type : Date ,
        default : Date.now ,
        
    }
})
delete mongoose.models['MealUser']
const MealUser = mongoose.models['MealUser'] || mongoose.model<INEWMODEL>('MealUser' , newSchema) 
export default MealUser