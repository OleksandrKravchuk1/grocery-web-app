"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useResetPasswordForm } from "@/components/auth/ResetPassword/useResetPasswordForm.hooks";

export default function ResetPasswordView() {
  const { form, error, isSuccess } = useResetPasswordForm();
  const [showPassword, setShowPassword] = useState(false);
  
  const isSubmitting = form.state.isSubmitting;
  const password = form.state.values.password;
  const confirmPassword = form.state.values.confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Change password</h1>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {isSuccess && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-200 border border-green-200 dark:border-green-800">
          Password updated successfully!
        </div>
      )}

      {!isSuccess && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-3"
        >
          <div className="space-y-2">
            <div className="relative">
              <form.Field name="password">
                {(field) => (
                  <Input
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isSubmitting || isSuccess}
                    autoComplete="new-password"
                    required
                    className="pr-12"
                  />
                )}
              </form.Field>

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>

            <form.Field name="confirmPassword">
              {(field) => (
                <Input
                  placeholder="Confirm New Password"
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSubmitting || isSuccess}
                  autoComplete="new-password"
                  required
                />
              )}
            </form.Field>

            {passwordsMismatch && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Passwords do not match.
              </p>
            )}
          </div>

          <Button
            disabled={!form.state.canSubmit || isSubmitting || isSuccess || passwordsMismatch}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2Icon className="h-4 w-4 animate-spin" />
                Updating...
              </span>
            ) : (
              "Update password"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}