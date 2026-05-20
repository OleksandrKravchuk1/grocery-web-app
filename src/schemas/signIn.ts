import { z } from "zod";

const FormErrors = {
  email: {
    required: "Email is required",
    invalid: "Invalid email address"
  },
  password: {
    length: "Password must be at least 8 characters"
  },
}

export const signInSchema = z.object({
    email: z.email({ message: FormErrors.email.invalid }).nonempty({ message: FormErrors.email.required }),
    password: z.string().min(8, FormErrors.password.length),
});