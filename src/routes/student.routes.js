import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {roleMiddleware} from '../middlewares/role.middleware.js'
import {createstudentController } from "../controllers/student/createStudent.controller.js";
import {studentsController} from '../controllers/student/students.controller.js';
import {getStudentController} from '../controllers/student/getStudent.Controller.js'
import {updateStudentController} from '../controllers/student/updateStudent.controller.js'
import {deleteStudentController} from '../controllers/student/deleteStudent.controller.js'


const studentRouter = Router();

studentRouter.post('/create-Student', authMiddleware, roleMiddleware('admin'), createstudentController);
studentRouter.get('/student-list', authMiddleware, roleMiddleware('admin', 'teacher'), studentsController);
studentRouter.get('/:id', authMiddleware, roleMiddleware('admin', 'teacher'), getStudentController);
studentRouter.patch('/update/:id', authMiddleware, roleMiddleware('admin'), updateStudentController);
studentRouter.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteStudentController);

export default studentRouter;