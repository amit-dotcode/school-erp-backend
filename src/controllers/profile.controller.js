import Admin from "../models/admin.modal.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";

const models = {
  admin: Admin,
  teacher: Teacher,
  student: Student,
};

export const profileController = async (req, res) => {
  const { id, role } = req.user;
  try {
    const model = models[role];
    if (!model) {
      return res.status(403).json({
        success: false,
        message: "this user role not found",
      });
    }
    const data = await model.findOne({
      user: id,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "user profile does not exist",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
