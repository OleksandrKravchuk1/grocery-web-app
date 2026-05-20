import { supabase } from "@/lib/supabase/client";

type SignInWithEmailOptions = {
  email: string;
  password: string;
};

const prettifySupabseError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }

  return new Error("Sign in failed");
}

export const signInWithEmail = async ({ email, password }: SignInWithEmailOptions) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw prettifySupabseError(error);
  }

  return data;
};