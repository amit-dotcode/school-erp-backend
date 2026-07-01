import mongoose from "mongoose";
import StudentsAttendance from "../../models/studentsAttendance.model.js";

export const updateStudentAttendance = async (req, res)=>{ 
    try{
    const id = req.params.attendanceId;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"not a valid id"
      })
    }
    const {status, editRemarkReason} = req.body;
    if(!status || !editRemarkReason){
      return res.status(400).json({
        success:false,
        message:"status and editRemarkReason mandatory !"
      })
    }
  
    const attendanceStatus = await StudentsAttendance.findById(id);
    if(!attendanceStatus){
      return res.status(404).json({
        success: false,
        message:"attendance record not found !"
      })  
    }
    if(attendanceStatus.status === status && attendanceStatus.editRemarkReason === editRemarkReason){
      return res.status(422).json({
        success:false,
        message:"No changes detected."
      })
    }else{
        const update = await StudentsAttendance.findByIdAndUpdate(id, {status, editRemarkReason}, {
          returnDocument: "after",
        })
        return res.status(200).json({
            success:true,
            response:update
        })
    }
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
} 