import mongoose from "mongoose";


const userDataSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["student", "teacher", "parent", "admin"],
            default:"student"
        },
    },
    {timestamps :true},


)

const User = mongoose.model('User', userDataSchema);
export default User;