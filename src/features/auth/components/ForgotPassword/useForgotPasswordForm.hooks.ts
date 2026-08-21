import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { FormErrors } from "@/constants/form-errors";
import { forgotPasswordSchema } from "@/features/auth/schemas/auth";
import { forgotPassword } from "@/features/auth/services/auth";

export function useForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = forgotPasswordSchema.safeParse(value);
        return result.success ? null : FormErrors.email.invalid;
      },
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setSuccess(false);
      try {
        await forgotPassword(
          value.email,
          `${window.location.origin}/reset-password`,
        );
        setSuccess(true);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to send reset link, try again later",
        );
      }
    },
  });

  return { form, error, success };
}
