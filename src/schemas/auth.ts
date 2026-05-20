import { z } from "zod";
import { FormErrors } from "@/constants/form-errors";
import { isStrongPasswordRegex } from "@/constants/regex";

export const signInSchema = z.object({
  email: z
    .email({ error: FormErrors.email.invalid }),
  password: z
    .string()
    .min(8, FormErrors.password.length)
    .regex(isStrongPasswordRegex, { error: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" }),
});