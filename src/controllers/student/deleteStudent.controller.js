import mongoose from "mongoose";
import Student from "../../models/student.model.js";


export const deleteStudentController = async (req, res)=>{
    try{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
        success: false,
        message: "Invalid student id",
      });
    }
    const removeStudentData = await Student.findById(id);
    if(!removeStudentData){
     return res.status(400).json({
        success: false,
        message: "student not found",
      });
    }else{
      return res.status(200).json({
        success: true,
        data: removeStudentData,
      });
    }
    }catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
    })
    }
}