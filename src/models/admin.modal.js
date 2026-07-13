import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({

    firstName:{
     type:String,
     reuired:true,
    },
    lastName:{
     type:String,
     reuired:true,
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    address:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true

    }
}, {timestamps:true})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;