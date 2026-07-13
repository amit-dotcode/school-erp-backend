import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    teacherId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  { timestamps: true },
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
