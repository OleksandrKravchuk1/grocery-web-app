import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { forgotPasswordSchema } from "@/schemas/auth";
import { forgotPassword } from "@/services/auth";

export function useForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = forgotPasswordSchema.safeParse(value);
        return result.success ? null : "Invalid email address";
      },
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setSuccess(false);
      try {
        await forgotPassword(value.email, `${window.location.origin}/reset-password`);
        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send reset link, try again later");
      }
    },
  });

  return { form, error, success };
}