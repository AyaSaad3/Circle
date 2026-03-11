import * as zod from "zod";
import { regex } from "../Helper/regex";

export const schema = zod.object({
    email: zod.string()
      .nonempty("Email is required")
      .regex(regex.email, "Enter valid email"),
    password: zod.string()
      .nonempty("Password is required")
      .regex(regex.password, "Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number and one special character"),
})
