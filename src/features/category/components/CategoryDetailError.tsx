"use client";

import Link from "next/link";
import {
  AlertCircleIcon,
  LayoutDashboardIcon,
  RefreshCwIcon,
} from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

interface CategoryDetailErrorProps {
  onRetry: () => void;
}

export function CategoryDetailError({ onRetry }: CategoryDetailErrorProps) {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <BackButton href={ROUTES.categories.root} label="All categories" />

        <div className="flex flex-col items-center justify-center gap-6 py-20 text-center animate-in fade-in duration-500">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
            <AlertCircleIcon className="h-10 w-10 text-red-500" />
          </div>

          <div className="flex max-w-md flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Failed to load category
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              We couldn&apos;t load this category and its products. Please check
              your connection and try again.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="default"
              onClick={onRetry}
              className="h-auto rounded-full px-6 py-2.5 font-semibold flex items-center gap-2 cursor-pointer"
            >
              <RefreshCwIcon className="h-4 w-4" />
              Try again
            </Button>
            <Link href={ROUTES.categories.root}>
              <Button
                variant="outline"
                className="h-auto rounded-full px-6 py-2.5 font-semibold flex items-center gap-2 cursor-pointer"
              >
                <LayoutDashboardIcon className="h-4 w-4" />
                All Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
