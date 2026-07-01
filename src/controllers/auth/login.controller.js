import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";

export const loginController = async (req, res) => {
  try {
    const { email, password} = req.body;
    if (!email || !password) return res.status(403).json({ message: "please enter your email and password both" });
    const verifyUser = await User.findOne({ email });
    if (!verifyUser) {
      return res.status(404).json({ message: "User not Found" });
    }
    const bcryptPassword = await bcrypt.compare(password, verifyUser.password);
      if (bcryptPassword) {
        const token = generateToken(verifyUser);
        return res.status(200).json({
          success: true,
          message: "login Sccessfully",
          token
        });
      } else {
       return res.status(401).json({
          success: false,
          message: "password was incorrect please try again",
        });
      }
  } catch (err) {
    console.log("err login", err.message);
    return res.status(500).json({
    message: "Internal Server Error"
   });
  }
};
