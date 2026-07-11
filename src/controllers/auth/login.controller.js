import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";

export const loginController = async (req, res) => {
  try {
    const { username, password} = req.body;
    if (!username || !password) return res.status(403).json({ message: "please enter your username and password both" });
    const verifyUser = await User.findOne({ username });
    const {id, username:loginuserName, role} = verifyUser;
    if (!verifyUser) {
      return res.status(401).json({
         success:false,
         message: "Invalid username or password" 
        });
    }
    const bcryptPassword = await bcrypt.compare(password, verifyUser.password);
      if (bcryptPassword) {
        const token = generateToken(verifyUser);
        return res.status(200).json({
          success: true,
          message: "login successfully",
          token,
          user:{
          id,
          username,
          role,
          }
        });
      } else {
       return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  } catch (err) {
    console.log("err login", err.message);
    return res.status(500).json({
    message: "Internal Server Error"
   });
  }
};
