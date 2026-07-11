import { Router } from "express";
import { createUserController } from "../controllers/auth/register.controller.js"
import { loginController } from "../controllers/auth/login.controller.js";


const authRoutes = Router();

authRoutes.post('/createUser', createUserController);
authRoutes.post('/login', loginController);

export default authRoutes;


