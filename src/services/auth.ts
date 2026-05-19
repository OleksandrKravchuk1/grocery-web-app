import { supabase } from "@/lib/supabase/client";

type SignInWithEmailOptions = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: SignInWithEmailOptions) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};