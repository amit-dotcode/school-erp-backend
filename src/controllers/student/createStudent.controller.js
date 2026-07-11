import Student from "../../models/student.model.js";
import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

export const createstudentController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      rollNumber,
      admissionDate,
      section,
      studentClass,
      password,
      confirmPassword,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !rollNumber ||
      !admissionDate ||
      !password ||
      !confirmPassword ||
      !section ||
      !studentClass
    ) {
      return res.status(400).json({
        success: false,
        message: "please fill all required fileds",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password not match",
      });
    }
    const lastStudent = await Student.findOne().sort({ createdAt: -1 });

    const generateAddmissionNumber = (lastStudent) => {
      let admissionNumber = "";
      if (lastStudent === null) {
        return admissionNumber = "ADM000001";
      } else {
        let studentCount = lastStudent.admissionNumber.slice(3);
        let num = Number(studentCount);
        num += 1;
        let pad = "ADM" + num.toString().padStart(6, "0");
        admissionNumber = pad;
        return admissionNumber;
      }
    }
    const verifyStudent = await Student.findOne({
      studentClass,
      section,
      rollNumber,
    });
    if (verifyStudent) {
      return res.status(409).json({
        success: false,
        message: "student already exist please try different student",
      });
    } else {
      const addmissionNum = generateAddmissionNumber(lastStudent);
      const hashPassword = await bcrypt.hash(password, 10);

      //create user
      const createUser = await User.create({
        username: addmissionNum,
        password: hashPassword,
        role: "student",
      });
      const createStudent = await Student.create({
        firstName,
        lastName,
        rollNumber,
        studentClass,
        section,
        admissionDate,
        admissionNumber:addmissionNum,
        user: createUser._id,
      });
      return res.status(200).json({
        success: true,
        message: "Student addedd successfully",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
