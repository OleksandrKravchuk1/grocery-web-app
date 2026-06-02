"use client";

import { useCategories } from "@/hooks/useCategory";
import { CategorySection } from "./CategorySection";

export function HomePageView() {
  const { categories, isError, isLoading } = useCategories();

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl font-bold text-zinc-950 dark:text-zinc-100">Loading...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl font-bold text-red-600">Failed to load categories.</h1>
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