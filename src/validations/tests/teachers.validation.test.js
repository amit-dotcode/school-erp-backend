import { describe, expect, it } from "vitest";
import { createTeacherSchema } from "../teachers.validation.js";

describe("createTeacherSchema", () => {
  it("should pass with valid teacher data", () => {
    const teacher = {
      firstName: "Amit",
      lastName: "Chaudhary",
      joiningDate: "2026-01-10",
      subject: "Mathematics",
      address: "Varanasi",
      contactNumber: "9876543210",
      emergencyContact: "9876543211",
      email: "amit@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    };

    const result = createTeacherSchema.safeParse(teacher);

    expect(result.success).toBe(true);
  });
});

it("should fail when contact number is invalid", () => {
  const teacher = {
    firstName: "Amit",
    lastName: "Chaudhary",
    joiningDate: "2026-01-10",
    subject: "Mathematics",
    address: "Varanasi",
    contactNumber: "12345",
    emergencyContact: "9876543211",
    email: "amit@gmail.com",
    password: "password123",
    confirmPassword: "password123",
  };

  const result = createTeacherSchema.safeParse(teacher);

  expect(result.success).toBe(false);
});