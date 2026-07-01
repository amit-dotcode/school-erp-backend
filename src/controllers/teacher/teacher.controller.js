import Teacher from "../../models/teacher.model.js";

export const teacherController = async (req, res)=>{
    try{
     const teacher = await Teacher.find();
     return res.status(200).json({
        success:true,
        data:teacher
     })

    }catch(err){
    return res.status(403).json({
            success:false,
            message:err.message
        })
        
    }
}