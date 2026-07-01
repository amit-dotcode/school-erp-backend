import studentAttendance from "../../models/studentsAttendance.model.js";
import students from '../../models/student.model.js';
import mongoose from "mongoose";

export const createAttendanceController = async (req, res)=>{
    try{
    const {studentClass, section, teacherId, attendanceDate, status, editRemarkReason, studentId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(studentId)){
        return res.status(400).json({
            success:false,
            message:"this is not vaild id please try again"
        })
    }
    if(!studentClass || !section || !teacherId || !attendanceDate || !status || !studentId){
        return res.status(400).json({
            success: false,
            message: "please fill all redquired field's"
        })
    }
    const verifyStudent = await students.findById(studentId);
    if(!verifyStudent){
        return res.status(400).json({
            success: false,
            message: "Student not Found"
        })
    }
    const attendanceVerify = await studentAttendance.findOne({student:studentId, attendanceDate});
    if(!attendanceVerify){
         const markeAttendance = await studentAttendance.create({
            student:studentId,
            studentClass,
            section,
            teacherId,
            attendanceDate,
            status,
            editRemarkReason
        })
        return res.status(201).json({
            success:true,
            message: "attendance marked"
        })
    }else{
       return res.status(400).json({
        success:false,
        message:"attendance already marked"
       })
    }
    }catch(err){
     return res.status(500).json({
        success:false,
        message: err.message
     })
    }
}