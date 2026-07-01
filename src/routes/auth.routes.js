import { Router } from "express";
import { registerController } from "../controllers/auth/register.controller.js"
import { loginController } from "../controllers/auth/login.controller.js";


const authRoutes = Router();

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);

export default authRoutes;


