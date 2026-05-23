import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { signInWithEmail } from "@/services/auth";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { signInSchema } from "@/schemas/auth";

export function useSignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    /* i try to use zod for validation but it doesn't work properly, so i use the onChange validator 
    to validate the form values and return the errors */
    validators: {
      onChange: ({ value }) => {
        const result = signInSchema.safeParse(value);
        return result.success ? null : "Invalid email or password";
      },
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await signInWithEmail(value);
        router.push(ROUTES.home);
        router.refresh();
      } catch (err) {
        setError("Failed to sign in, try again later");
      }
    },
  });

  return { form, error };
}