import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: Number,
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    admissionNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true

    },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model("student", studentSchema);
export default Student;
