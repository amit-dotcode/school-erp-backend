import { Router } from "express";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {dashboardController} from '../controllers/dashboard.controller.js'



const roleRouter = Router();

roleRouter.get("/dashboard", authMiddleware, roleMiddleware('teacher', 'student', 'admin'),  dashboardController);

export default roleRouter;