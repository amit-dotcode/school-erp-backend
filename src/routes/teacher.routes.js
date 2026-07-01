import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { createTeacherController } from "../controllers/teacher/createTeacher.controller.js";
import {teacherController} from "../controllers/teacher/teacher.controller.js"
import {getTeacherController} from '../controllers/teacher/getTeacher.controller.js'
import {updateTeacherController} from '../controllers/teacher/updateTeacher.controller.js'

const teacherRoute = Router();

teacherRoute.post('', authMiddleware, roleMiddleware('admin'), createTeacherController);
teacherRoute.get('', authMiddleware, roleMiddleware('admin'), teacherController);
teacherRoute.get('/:teacherId', authMiddleware, roleMiddleware('admin'), getTeacherController);
teacherRoute.patch('/:teacherId', authMiddleware, roleMiddleware('admin'), updateTeacherController);

export default teacherRoute;