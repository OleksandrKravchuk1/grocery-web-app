"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/services/auth";
import { ROUTES } from "@/constants/routes";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut();
            router.push(ROUTES.auth.signIn);
            router.refresh();
        } catch (err) {
            console.error("Sign out failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="mb-4 text-2xl font-semibold">Profile</h1>
            <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
            >
                {loading ? "Signing out..." : "Sign out"}
            </button>
        </div>
    );
};