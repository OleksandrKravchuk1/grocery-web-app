"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ROUTES } from "@/constants/routes";
import { useSignInForm } from "@/features/auth/components/SignIn/useSignIn.hooks";
import { Loader2Icon } from "lucide-react";

export default function SignInPage() {
  const { form, error } = useSignInForm();
  const isSubmitting = form.state.isSubmitting;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Sign in</h1>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-3"
      >
        <form.Field name="email">
          {(field) => (
            <Input
              placeholder="Email"
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isSubmitting}
              required
            />
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <PasswordInput
              placeholder="Password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isSubmitting}
              required
            />
          )}
        </form.Field>
        <div className="text-xs">
          <Link
            href={ROUTES.auth.forgotPassword}
            className="text-green-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          disabled={!form.state.canSubmit || isSubmitting}
          type="submit"
          className="w-full"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="text-sm flex items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-zinc-400">Don't have an account?</span>
          <Link
            prefetch
            href={ROUTES.auth.signUp}
            className="text-green-600 font-medium hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
