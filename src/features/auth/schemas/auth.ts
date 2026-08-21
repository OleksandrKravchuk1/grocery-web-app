import { z } from "zod";
import { FormErrors } from "@/constants/form-errors";
import { isStrongPasswordRegex } from "@/constants/regex";

export const signInSchema = z.object({
  email: z.email({ error: FormErrors.email.invalid }),
  password: z
    .string()
    .min(8, FormErrors.password.length)
    .regex(isStrongPasswordRegex, { error: FormErrors.password.pattern }),
});

export const signUpSchema = z
  .object({
    email: z.email({ error: FormErrors.email.invalid }),
    password: z
      .string()
      .min(8, FormErrors.password.length)
      .regex(isStrongPasswordRegex, { error: FormErrors.password.pattern }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: FormErrors.confirmPassword.mismatch,
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email({ error: FormErrors.email.invalid }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: FormErrors.password.length })
      .max(28, { message: FormErrors.password.length })
      .regex(isStrongPasswordRegex, { message: FormErrors.password.pattern }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: FormErrors.confirmPassword.mismatch,
    path: ["confirmPassword"],
  });
