"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForgotPasswordForm } from "@/features/auth/components/ForgotPassword/useForgotPasswordForm.hooks";

export function ForgotPasswordView() {
  const { form, error, success } = useForgotPasswordForm();
  const isSubmitting = form.state.isSubmitting;
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Forgot Password</h1>

      {success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-200 border border-green-200 dark:border-green-800">
          Password reset link sent successfully! Check your email.
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {!success && (
        <>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your email address to receive a link to reset your password.
            </p>
          </div>
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

            <Button
              disabled={!form.state.canSubmit || isSubmitting}
              type="submit"
              className="w-full"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  Sending...
                </span>
              ) : (
                "Send Link"
              )}
            </Button>
          </form>
        </>
      )}
    </div>

  );
}