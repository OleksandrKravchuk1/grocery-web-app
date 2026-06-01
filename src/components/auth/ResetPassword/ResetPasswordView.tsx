"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useResetPassword } from "@/hooks/auth/useResetPassword";

export default function ResetPasswordView() {
  const { form, error, isSuccess } = useResetPassword();
  const isSubmitting = form.state.isSubmitting;

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-3"
      >
        <form.Field name="password">
          {(field) => (
            <Input
              placeholder="New Password"
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isSubmitting || isSuccess}
              required
            />
          )}
        </form.Field>

        <Button
          disabled={!form.state.canSubmit || isSubmitting || isSuccess}
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
    </div>
  );
}