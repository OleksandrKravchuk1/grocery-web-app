import { supabase } from "@/lib/supabase/client";

export type AuthOptions = {
  email: string;
  password: string;
};

const prettifySupabseError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }

  return new Error("Sign in failed");
};

export const signInWithEmail = async ({ email, password }: AuthOptions) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw prettifySupabseError(error);
  }

  return data;
};

export const signUpWithEmail = async ({ email, password }: AuthOptions) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw prettifySupabseError(error);
  }

  return data;
};

export const forgotPassword = async (email: string, redirectTo?: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    throw prettifySupabseError(error);
  }

  return data;
};

export const resetPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw prettifySupabseError(error);
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw prettifySupabseError(error);
  }
};
