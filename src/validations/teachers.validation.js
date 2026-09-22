import z from "zod";

export const createTeacherSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "First name is required"),
    joiningDate: z.string().min(1, "Joining date is required"),
    subject: z.string().trim().min(1, "Subect is required"),
    address: z.string().trim().min(1, "Address is required"),
    contactNumber: z
      .string()
      .regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
    emergencyContact: z
      .string()
      .regex(/^\d{10}$/, "Emergency contact must be exactly 10 digits"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const updateTeacherSchema = z.object({
  firstName: z.string().trim().min(1).optional(),

  lastName: z.string().trim().min(1).optional(),

  joiningDate:  z.string().trim().min(1).optional(),
  
  subject: z.string().trim().min(1).optional(),

  address: z.string().trim().min(1).optional(),

  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits")
    .optional(),

  emergencyContact: z
    .string()
    .regex(/^\d{10}$/, "Emergency contact must be exactly 10 digits")
    .optional(),

  email: z.email("Invalid email address").optional(),
});
