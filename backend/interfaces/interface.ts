export interface IMongoModel { 
    username : string , 
    email : string , 
    password : string , 
    role ?: 'user'|'admin'
}