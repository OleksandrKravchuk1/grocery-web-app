"use client";

import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { GuestProfileView } from "@/features/profile/components/GuestProfileView";
import { ProfileAvatarCard } from "@/features/profile/components/ProfileAvatarCard";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfileForm } from "@/features/profile/hooks/useProfileForm";
import { cn } from "@/lib/utils";

export function ProfileView() {
  const { user } = useAuth();
  const { form, isLoading, isSaving, message, setMessage } = useProfileForm();

  if (!user) {
    return <GuestProfileView />;
  }

  if (isLoading && user) {
    return (
      <div className="flex min-h-[calc(100vh-85px)] items-center justify-center bg-zinc-50 dark:bg-black">
        <Loader2Icon className="h-10 w-10 animate-spin text-green-600 dark:text-green-500" />
      </div>
    );
  }

  const handleSignOutError = (errorText: string) => {
    setMessage({ type: "error", text: errorText });
  };

  return (
    <div className="min-h-[calc(100vh-85px)] bg-zinc-50 px-4 py-8 dark:bg-black font-sans md:px-8 md:py-12">
      <div className="mx-auto max-w-4xl animate-in fade-in duration-500">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          My Profile
        </h1>

        {message && (
          <div
            className={cn(
              "mb-6 flex items-start gap-3 rounded-lg border p-4 text-sm animate-in fade-in slide-in-from-top-2 duration-300",
              message.type === "success"
                ? "border-green-250 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-400"
                : "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400",
            )}
          >
            {message.type === "success" ? (
              <CheckCircle2Icon className="h-5 w-5 shrink-0 text-green-600 dark:text-green-500" />
            ) : (
              <AlertCircleIcon className="h-5 w-5 shrink-0 text-red-600 dark:text-red-500" />
            )}
            <div>{message.text}</div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <ProfileAvatarCard
            firstName={form.state.values.firstName}
            lastName={form.state.values.lastName}
            email={user.email || ""}
            onSignOutError={handleSignOutError}
          />
          <ProfileForm form={form} isSaving={isSaving} />
        </div>
      </div>
    </div>
  );
}
