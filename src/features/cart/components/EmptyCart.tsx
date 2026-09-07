"use client";

import Link from "next/link";
import { ArrowRightIcon, ShoppingBagIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function EmptyCart() {
  return (
    <div className="flex min-h-105 flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-inner dark:bg-emerald-950/40 dark:text-emerald-400">
        <ShoppingBagIcon className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
        Your cart is empty
      </h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        Looks like you haven&apos;t added any products to your cart yet. Explore
        our fresh grocery catalog!
      </p>
      <Link
        href={ROUTES.products?.root || "/products"}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-500 active:scale-98"
      >
        <span>Explore Products</span>
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
