import StudentsAttendance from "../../models/studentsAttendance.model.js";

export const getStudentsAttendance = async (req, res) => {
  try {

    const { studentClass, section, attendanceDate } = req.query;
    const date = new Date(attendanceDate);
    if(isNaN(date.getTime())){
        return res.status(400).json({
        success: false,
        message: "Invalid date"
    });
    }
    if(!studentClass || !section  || !attendanceDate){
        return res.status(400).json({
            success:false,
            message:"studentClass, section and attendanceDate are required."
        })
    }
    const attendanceList = await StudentsAttendance.find({
      studentClass,
      section,
      attendanceDate,
    }).populate("student", "firstName lastName rollNumber");
    if (attendanceList.length > 0) {
      return res.status(200).json({
        success: true,
        response: attendanceList,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
