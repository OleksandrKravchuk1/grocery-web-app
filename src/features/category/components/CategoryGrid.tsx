"use client";

import { FolderIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import type { Category } from "../services/categories";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories?.length) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <FolderIcon className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          No Categories Found
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Check back later for new categories.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={ROUTES.categories.category(category.id.toString())}
          className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 transition-transform duration-300 group-hover:scale-110 dark:bg-green-950/30 dark:text-green-500">
            {category.icon && category.icon.includes("http") ? (
              <img
                src={category.icon}
                alt={category.name}
                className="h-8 w-8 object-contain"
              />
            ) : category.icon ? (
              <span className="text-2xl">{category.icon}</span>
            ) : (
              <FolderIcon className="h-8 w-8" />
            )}
          </div>

          <h3 className="text-center font-medium text-zinc-900 transition-colors duration-300 group-hover:text-green-600 dark:text-zinc-100 dark:group-hover:text-green-400 line-clamp-1">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}
