import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useForm } from "@tanstack/react-form";
import { resetPasswordSchema } from "@/schemas/auth";
import { resetPassword } from "@/services/auth";

export function useResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = resetPasswordSchema.safeParse(value);
        return result.success ? null : "Invalid password";
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
        setError(err instanceof Error ? err.message : "Failed to send reset link, try again later");
      }
    },
  });

  return { form, error, isSuccess };
}