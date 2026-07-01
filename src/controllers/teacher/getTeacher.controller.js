import mongoose from "mongoose";
import Teacher from "../../models/teacher.model.js";

export const getTeacherController = async (req, res) => {
  try {
    const id = req.params.teacherId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher id",
      });
    }
    const teacher = await Teacher.findById(id);
    return res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};
