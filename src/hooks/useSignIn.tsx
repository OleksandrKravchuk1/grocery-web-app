import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { getCurrentUser, signIn } from "@/services/auth";
import { useForm } from "@tanstack/react-form";

export function useSignIn() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await signIn(value);
      router.push(ROUTES.home);
      router.refresh();
    },
  });

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      const user = await getCurrentUser();
      if (mounted && user) {
        router.replace(ROUTES.home);
      }
    };
    checkUser();

    return () => {
      mounted = false;
    };
  }, [router]);

  return { form };
}
