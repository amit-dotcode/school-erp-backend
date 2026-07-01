import Student from "../../models/student.model.js";

export const getStudentController = async (req, res)=>{
    try{
     const getStudnetSingleData = await Student.findById(req.params.id);
     return res.status(200).json({
        success:true,
        data:getStudnetSingleData
     })

    }catch(err){
    return res.status(403).json({
            success:false,
            message:err.message
        })
        
    }
}