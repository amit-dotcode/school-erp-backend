import { Router } from "express";
import {createAttendanceController} from '../controllers/studentAttendance/createAttendance.controller.js'
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { getStudentsAttendance } from "../controllers/studentAttendance/getAttendance.controller.js";
import {updateStudentAttendance} from "../controllers/studentAttendance/updateStudentAttendance.controller.js"

const studentsAttendanceRoute = Router();

studentsAttendanceRoute.post('', authMiddleware, roleMiddleware('teacher'), createAttendanceController);
studentsAttendanceRoute.get('', authMiddleware, roleMiddleware('teacher'), getStudentsAttendance);
studentsAttendanceRoute.patch('/:attendanceId', authMiddleware, roleMiddleware('teacher'), updateStudentAttendance);

export default studentsAttendanceRoute;