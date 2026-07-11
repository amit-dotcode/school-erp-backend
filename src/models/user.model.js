import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher", "parent", "admin"],
      default: "student",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userDataSchema);
export default User;
