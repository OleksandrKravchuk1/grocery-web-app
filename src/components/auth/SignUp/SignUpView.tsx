"use client";

import { useSignUpForm } from "@/components/auth/SignUp/useSignUp.hooks";
import { Input } from "@/components/ui/Input";
import { Loader2Icon } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function SignUpView() {
  const { form, error } = useSignUpForm();
  const isSubmitting = form.state.isSubmitting;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Sign up</h1>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <form.Subscribe selector={(state) => [state.errors]}>
        {([errors]) =>
          errors.length > 0 ? (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200 border border-red-200 dark:border-red-800">
              {errors.join(", ")}
            </div>
          ) : null
        }
      </form.Subscribe>

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
            <Input
              placeholder="Password"
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isSubmitting}
              required
            />
          )}
        </form.Field>
        <form.Field name="confirmPassword">
          {(field) => (
            <Input
              placeholder="Confirm Password"
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isSubmitting}
              required
            />
          )}
        </form.Field>
        <Button
          disabled={!form.state.canSubmit || isSubmitting}
          type="submit"
          className="w-full"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Signing up...
            </span>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>

      <div className="text-sm flex items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-zinc-400">Already have an account?</span>
          <Link
            prefetch
            href={ROUTES.auth.signIn}
            className="text-green-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}