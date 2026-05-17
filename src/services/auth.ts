import { supabase } from "@/lib/supabase/client";

type signInWithEmailOptions = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: signInWithEmailOptions) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data;
};
