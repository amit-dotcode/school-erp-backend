import Admin from "../../models/admin.modal.js";
import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
export const createAdminController = async (req, res)=>{
    try{
    const {firstName, lastName, contact, email, address, username, password, confirmPassword} = req.body
    if(!firstName ||!lastName || !contact || !email || !address || !username|| !password ||!confirmPassword){
        return res.status(400).json({
            success:false,
            message: "Invalid request please fill all required filed"
        })
    }
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password not match",
      });
    }
    const verifyAdmin = await Admin.findOne({
        $or:[
            {contact},
            {email}
        ]
    });
    if(!verifyAdmin){
        const hashPassword = await bcrypt.hash(password, 10);
        const createUserAdmin = await User.create({
            username,
            password:hashPassword,
            role:"admin"
        })
        await Admin.create({
            firstName,
            lastName,
            email,
            contact,
            address,
            user:createUserAdmin._id
        })
     }else{
        return res.status(409).json({
            success:false,
            message:"admin already exits"
        })
    
     }
     return res.status(200).json({
        success:true,
        message:"admin created successfully"
     })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })

    }
}