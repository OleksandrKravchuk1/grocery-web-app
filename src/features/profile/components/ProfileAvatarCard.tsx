"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, LogOutIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { signOut } from "@/features/auth/services/auth";

interface ProfileAvatarCardProps {
  firstName: string;
  lastName: string;
  email: string;
  onSignOutError: (message: string) => void;
}

export function ProfileAvatarCard({
  firstName,
  lastName,
  email,
  onSignOutError,
}: ProfileAvatarCardProps) {
  const router = useRouter();

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      router.push(ROUTES.auth.signIn);
      router.refresh();
    },
    onError: (err) => {
      console.error("Sign out failed", err);
      onSignOutError("Sign out failed. Please try again.");
    },
  });

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  const initials =
    `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "U";
  const displayName = firstName
    ? `${firstName} ${lastName}`.trim()
    : "User Profile";

  return (
    <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-green-500 to-teal-500 text-white font-semibold text-3xl shadow-md border-4 border-white dark:border-zinc-900 transition-transform duration-300 hover:scale-105">
        {initials}
      </div>

      <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 text-center">
        {displayName}
      </h2>
      {email && (
        <p className="text-sm text-zinc-400 mt-1 flex items-center gap-1 break-all animate-in fade-in duration-300">
          <MailIcon className="h-3.5 w-3.5 shrink-0" />
          {email}
        </p>
      )}

      <span className="mt-4 inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-950/30 dark:text-green-400 animate-in fade-in duration-300">
        Verified Account
      </span>

      <div className="mt-8 w-full border-t border-zinc-100 pt-6 dark:border-zinc-800">
        <Button
          variant="destructive"
          onClick={handleSignOut}
          disabled={signOutMutation.isPending}
          className="w-full flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition-all cursor-pointer"
        >
          {signOutMutation.isPending ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <LogOutIcon className="h-4 w-4" />
          )}
          {signOutMutation.isPending ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );
}
