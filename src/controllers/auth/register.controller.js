import User from "../../models/user.model.js"
import bcrypt from 'bcrypt';

export const createUserController = async (req, res)=>{
    try{
    const {username, password, role} = req.body;
    const existingUser = await User.findOne({username});
    const hashPassword = await bcrypt.hash(password, 10);
    if(existingUser){
        res.status(400).json({message:"user already exits please different user"});
    }else{
        await User.create({
            username,
            password:hashPassword,
            role,
        })
     console.log(req.body);
     res.status(200).json({
        sucess: true,
        message:  `${role} create successfully`
     })
    }
    }catch(err){
    res.status(400).json({
        success:false,
        message:err.message
    })
     console.log(err.message, "userAuthController");
    }
}