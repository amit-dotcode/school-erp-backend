import mongoose from "mongoose";

const studentsAttendanceSchema= new mongoose.Schema(
  {
    studentClass:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    teacherId:{
        type:String,
        required:true
    },
    attendanceDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["present", "absent", "leave"],
    },
    editRemarkReason: {
      type: String,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
  },
  { timestamps: true },
);


const StudentsAttendance = mongoose.model('studentAttendance', studentsAttendanceSchema);
export default StudentsAttendance;