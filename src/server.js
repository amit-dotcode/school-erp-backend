import express from 'express';
import cors from "cors";
import connectDB from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import roleRouter from './routes/dashboard.routes.js';
import studentRouter from './routes/student.routes.js';
import studentsAttendanceRoute from './routes/studentsAttendance.routes.js'
import teacherRoute from './routes/teacher.routes.js'


//express server
const app = express();

//cors
app.use(cors());

//for get api data response into req.body
app.use(express.json());

//htmlget form data response into req.body
app.use(express.urlencoded({ extended: true }));

//db connection 
await connectDB();

//router
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", roleRouter);
app.use("/api/Students", studentRouter);
app.use ("/api/student-attendance", studentsAttendanceRoute);
app.use ("/api/teacher", teacherRoute);

//Temp route
app.get("/", (req, res) => {
   res.send("Server Working");
});

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})