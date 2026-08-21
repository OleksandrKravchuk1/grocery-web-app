"use client";

import { ShoppingBagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export function GuestProfileView() {
  const router = useRouter();

  const handleSihnIn = () => {
    router.push(ROUTES.auth.signIn);
  };

  const handleSignUp = () => {
    router.push(ROUTES.auth.signUp);
  };

  return (
    <div className="flex min-h-[calc(100vh-85px)] items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black font-sans">
      <div className="w-full max-w-md transform rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl transition-all dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-green-950/30">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-20 dark:bg-green-800"></div>
            <ShoppingBagIcon className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome to Grabber
          </h1>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Sign in to check out faster, review your orders, and sync your
            favorite items across devices.
          </p>

          <div className="mt-8 w-full space-y-3">
            <Button
              onClick={handleSihnIn}
              className="w-full py-3 h-11 text-base font-semibold"
            >
              Sign In
            </Button>
            <Button
              onClick={handleSignUp}
              variant="outline"
              className="w-full py-3 h-11 text-base font-semibold"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
