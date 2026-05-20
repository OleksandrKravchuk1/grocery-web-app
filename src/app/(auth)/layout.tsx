import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { ROUTES } from "@/constants/routes";
import { getCurrentUser } from "@/services/auth.server";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser();

  if (user) {
    redirect(ROUTES.home);
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
        {children}
      </section>
    </main>
  );
}
