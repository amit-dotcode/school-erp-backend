import { Router } from "express";
import {profileController} from '../controllers/profile.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const profileRoutes = Router();


profileRoutes.get('/profile', authMiddleware, profileController)

export default profileRoutes;
