"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useSignIn } from "@/hooks/useSignIn";

const inputClassName = "w-full rounded-md border px-3 py-3";
const buttonClassName =
  "w-full rounded-md bg-green-600 px-3 py-2 text-white disabled:opacity-60";

export default function SignInPage() {
  const { form } = useSignIn();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Sign in</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-3"
      >
        <form.Field name="email">
          {(field) => (
            <input
              className={inputClassName}
              placeholder="Email"
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <input
              className={inputClassName}
              placeholder="Password"
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
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
        <button
          className={buttonClassName}
          disabled={!form.state.canSubmit}
          type="submit"
        >
          Sign in
        </button>
      </form>

      <div className="text-sm flex items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-zinc-400">Don't have an account?</span>
          <Link
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
