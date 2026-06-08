"use client";

import { useCategories } from "@/hooks/useCategory";
import { CategorySection } from "./CategorySection";
import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HomePageView() {
  const { categories, isError, refetch } = useCategories();

  if (isError) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
        <div className="flex flex-col items-center justify-center gap-6 text-center max-w-sm">
          {/* Alert Icon Wrapper */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
            <AlertCircleIcon className="h-10 w-10 text-red-500" />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Failed to load categories
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              We couldn&apos;t load the homepage content. Please check your connection and try again.
            </p>
          </div>

          {/* Retry Button */}
          <Button
            variant="dark"
            onClick={() => refetch()}
            className="h-auto rounded-full px-6 py-2.5 font-semibold flex items-center gap-2"
          >
            <RefreshCwIcon size={14} />
            Try again
          </Button>
        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen flex flex-col items-center bg-zinc-50 font-sans dark:bg-black pb-10">
      <div className="mt-10 w-full max-w-6xl">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            categoryId={category.id}
            title={category.name}
          />
        ))}
      </div>
    </main>
  );
}