"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/services/auth";
import { ROUTES } from "@/constants/routes";

export default function Page() {
    const router = useRouter();

    const signOutMutation = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            router.push(ROUTES.auth.signIn);
            router.refresh();
        },
        onError: (error) => {
            console.error("Sign out failed", error);
        },
    });

    return (
        <div className="p-8">
            <h1 className="mb-4 text-2xl font-semibold">Profile</h1>
            <button
                type="button"
                onClick={() => signOutMutation.mutate()}
                disabled={signOutMutation.isPending}
                className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
            >
                {signOutMutation.isPending ? "Signing out..." : "Sign out"}
            </button>
        </div>
    );
}