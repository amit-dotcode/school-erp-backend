import mongoose from "mongoose";
import Teacher from "../../models/teacher.model.js";
import {updateTeacherSchema } from "../../validations/teachers.validation.js";

export const updateTeacherController = async (req, res) => {
  try {
    const id = req.params.teacherId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher id",
      });
    }
    const validationResult = updateTeacherSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues[0]?.message || "Invalid request";
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
    const updateData = validationResult.data;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(400).json({
        success: false,
        message: "teacher not found",
      });
    } else {
      const updateTeacher = await Teacher.findByIdAndUpdate(id, updateData, {
        returnDocument: "after",
      });
      return res.status(200).json({
        success: true,
        data: updateTeacher,
        message:"teacher record updated"
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
