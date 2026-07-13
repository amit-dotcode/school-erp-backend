import { Router } from "express";
import {createAdminController} from '../controllers/admin/createAdmin.controller.js'
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const adminRoutes = Router();

adminRoutes.post("/admin", authMiddleware, roleMiddleware('admin'), createAdminController);

export default adminRoutes