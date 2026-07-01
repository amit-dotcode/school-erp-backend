import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authUserHeader = req.headers.authorization;
    if (!authUserHeader) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }
    const token = authUserHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
