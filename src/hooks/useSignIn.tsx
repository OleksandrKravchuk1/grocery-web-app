import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { signIn } from "@/services/auth";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export function useSignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const friendly = (err: unknown) => {
    if (!(err instanceof Error)) return "Sign in failed";
    if (
      err.message.includes("Invalid login") ||
      err.message.includes("Invalid credentials")
    ) {
      return "Wrong email or password.";
    }
    return err.message;
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await signIn(value);
        router.push(ROUTES.home);
        router.refresh();
      } catch (error) {
        setError(friendly(error));
      }
    },
  });
  return { form, error, setError };
}
