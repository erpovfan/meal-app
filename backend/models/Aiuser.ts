import mongoose , {Document , Schema, models} from "mongoose";
import {IMongoModel} from '../interfaces/interface'



const AiAuthUserSchema = new Schema<IMongoModel>({
    username : {type : String , require : true} , 
    email : {type : String , require : true} , 
    password : {type : String , require: true} , 
    role : {type :String , require : true , default : 'user' , enum : ['user' , 'admin']}
})
const AiUserModel = mongoose.models["Aiuser"] || mongoose.model<IMongoModel>("Aiuser" , AiAuthUserSchema)
export default AiUserModel