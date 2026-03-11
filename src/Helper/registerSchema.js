import * as zod from "zod";
import { regex } from "../Helper/regex";
import { calculateAge } from "../Helper/date";

export const schema = zod.object({
    name: zod.string()
      .nonempty("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: zod.string()
      .nonempty("Email is required")
      .regex(regex.email, "Enter valid email"),
    password: zod.string()
      .nonempty("Password is required")
      .regex(regex.password, "Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number and one special character"),
    rePassword: zod.string()
      .nonempty("Confirm Password is required"),
    dateOfBirth: zod.string()
      .nonempty("Birth Date is required")
      .refine((data) => calculateAge(data) >= 18, "You must be at least 18 years old"),
    gender: zod.string()
      .nonempty("Gender is required")
      .regex(regex.gender, "gender must be one of (male or female)"),
}).refine((data) => data.password == data.rePassword, {message: "Password and Confirm Password don't match", path: ["rePassword"]});
