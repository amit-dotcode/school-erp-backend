import Student from "../../models/student.model.js";

export const studentsController = async (req, res)=>{
    try{
    const studentData = await Student.find()
    return res.status(200).json({
        successs:true,
        data: studentData
    })
    }catch(err){
    return res.status(500).json({
        successs:false,
        message:err.message
    })
    }
}

