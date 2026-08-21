import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { FormErrors } from "@/constants/form-errors";
import { useForm } from "@tanstack/react-form";
import { resetPasswordSchema } from "@/features/auth/schemas/auth";
import { resetPassword } from "@/features/auth/services/auth";

export function useResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = resetPasswordSchema.safeParse(value);
        if (result.success) return null;

        return result.error.issues[0]?.message ?? FormErrors.password.length;
      },
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setIsSuccess(false);
      try {
        await resetPassword(value.password);
        setIsSuccess(true);
        setTimeout(() => {
          router.push(ROUTES.auth.signIn);
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update password, try again later");
      }
    },
  });

  return { form, error, isSuccess };
}