import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { signUpWithEmail } from "@/services/auth";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { signUpSchema } from "@/schemas/auth";

export function useSignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = signUpSchema.safeParse(value);
        if (result.success) return null;

        if (result.error.issues.length > 0) {
          return result.error.issues[0].message;
        }

        return "Invalid registration data";
      },
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await signUpWithEmail({
          email: value.email,
          password: value.password,
        });
        router.push(ROUTES.home);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to sign up, try again later");
      }
    },
  });

  return { form, error };
}