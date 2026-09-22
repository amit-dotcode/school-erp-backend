import Teacher from "../../models/teacher.model.js";
import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import { createTeacherSchema } from "../../validations/teachers.validation.js";
export const createTeacherController = async (req, res) => {
  try {
    const validationResult = createTeacherSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues[0]?.message || "Invalid request";
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
    const {
      firstName,
      lastName,
      joiningDate,
      subject,
      address,
      contactNumber,
      emergencyContact,
      email,
      password,
      confirmPassword,
    } = validationResult.data;

    const lastTeacher = await Teacher.findOne().sort({ createdAt: -1 });

    const generateTeacherIdNumber = (lastTeacher) => {
      let teacherIdNumber = "";
      if (lastTeacher === null) {
        return (teacherIdNumber = "TCH000001");
      } else {
        let TeacherCount = lastTeacher.teacherId.slice(3);
        let num = Number(TeacherCount);
        num += 1;
        let pad = "TCH" + num.toString().padStart(6, "0");
        teacherIdNumber = pad;
        return teacherIdNumber;
      }
    };

    const existingTeacher = await Teacher.findOne({
      $or: [{ email }, { contactNumber }],
    });
    if (existingTeacher) {
      return res.status(409).json({
        success: false,
        message: "teacher already exist with this email or contact number",
      });
    } else {
      const teacherIdNumber = generateTeacherIdNumber(lastTeacher);
      console.log(teacherIdNumber, "teacherIdNumber Number");
      const hashPassword = await bcrypt.hash(password, 10);

      //create user
      const createUser = await User.create({
        username: teacherIdNumber,
        password: hashPassword,
        role: "teacher",
      });
      const createStudent = await Teacher.create({
        firstName,
        lastName,
        joiningDate,
        subject,
        teacherId:teacherIdNumber,
        address,
        contactNumber,
        emergencyContact,
        email,
        user: createUser._id,

      });
      return res.status(201).json({
        success: true,
        message: "teacher created successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
