import { calculateAge } from "./date";
import { regex } from "./regex";

export const validation = {
    name: {
        required: { value: true, message: "Name is required" },
        minLength: { value: 2, message: "Name must be at least two characters" },
        maxLength: { value: 50, message: "Name must be at most 50 characters" },
    },
    email: {
        required: { value: true, message: "Email is required" },
        pattern: { value: regex.email, message: "Enter valid email" },
    },
    password: {
        required: { value: true, message: "Password is required" },
        pattern: { value: regex.password, message: "Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number and one special character"},
    },
    rePassword: (watch) => {
        return {
            required: { value: true, message: "Confirm Password is required" },
            validate: (repassword) => repassword == watch("password") || "Password and Confirm Password don't match",
        };
    },
    birthDate: {
        required: { value: true, message: "Birth Date is required" },
        validate: (dateOfBirth) => calculateAge(dateOfBirth) >= 18 || "You must be at least 18 years old",
    },
    gender: {
        required: { value: true, message: 'Gender is required' },
        pattern: { value: regex.gender, message: "gender must be one of (male or female)" }
    }
};