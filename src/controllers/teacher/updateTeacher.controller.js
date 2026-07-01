import mongoose from "mongoose";
import Teacher from "../../models/teacher.model.js";

export const updateTeacherController = async (req, res) => {
  try {
    const id = req.params.teacherId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student id",
      });
    }
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(400).json({
        success: false,
        message: "teacher not found",
      });
    } else {
      const updateTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });
      return res.status(200).json({
        success: true,
        data: updateTeacher,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
