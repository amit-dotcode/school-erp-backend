import mongoose from "mongoose";
import Student from "../../models/student.model.js";

export const updateStudentController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student id",
      });
    }
    const getStudentData = await Student.findById(id);
    if (!getStudentData) {
      return res.status(400).json({
        success: false,
        message: "student not found",
      });
    } else {
      const updateStudent = await Student.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });
      return res.status(200).json({
        success: true,
        data: updateStudent,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
