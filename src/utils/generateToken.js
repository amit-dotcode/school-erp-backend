import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  console.log(user, "user")
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" },
  );
  return token;
};
