"use client";

import {
  AlertCircle,
  ArrowLeft,
  FolderIcon,
  PackageOpen,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { useFavoriteProducts } from "@/features/favorites/hooks/useFavoriteProducts";
import { ProductCard } from "@/features/product/components/ProductCard";
import { ProductCardSkeleton } from "@/features/product/components/ProductCardSkeleton";
import { useProductsByCategoryId } from "@/features/product/hooks/useProductsByCategoryId";
import type { Category } from "../services/categories";

interface CategoryDetailViewProps {
  categoryId: number;
  initialCategory: Category | null;
}

const SKELETON_KEYS = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8",
];

export function CategoryDetailView({
  categoryId,
  initialCategory,
}: CategoryDetailViewProps) {
  const { products, isLoading, isError, error } =
    useProductsByCategoryId(categoryId);
  const { favoriteIds, toggleFavorite } = useFavoriteProducts();

  const title = initialCategory?.name ?? `Category #${categoryId}`;

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-in fade-in duration-500">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link
            href={ROUTES.categories.root}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-green-600 dark:text-zinc-400 dark:hover:text-green-400 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Categories</span>
          </Link>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400 shadow-xs">
                {initialCategory?.icon &&
                initialCategory.icon.includes("http") ? (
                  <img
                    src={initialCategory.icon}
                    alt={title}
                    className="h-7 w-7 object-contain"
                  />
                ) : initialCategory?.icon ? (
                  <span className="text-2xl">{initialCategory.icon}</span>
                ) : (
                  <FolderIcon className="h-6 w-6" />
                )}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {title}
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {isLoading
                    ? "Loading products..."
                    : `${products.length} ${products.length === 1 ? "product" : "products"} available`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content State */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
            {SKELETON_KEYS.map((key) => (
              <ProductCardSkeleton key={key} className="w-full shrink" />
            ))}
          </div>
        ) : isError ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50/50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
            <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Failed to load products
            </h3>
            <p className="mt-1 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
              {error ||
                "An error occurred while fetching products for this category."}
            </p>
            <Button
              variant="dark"
              onClick={() => window.location.reload()}
              className="mt-6 h-auto rounded-full px-6 py-2.5 font-semibold flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
              <PackageOpen className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              No products found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              There are no products available in {title} right now. Please check
              back later.
            </p>
            <Link href={ROUTES.categories.root} className="mt-6">
              <Button variant="dark" className="rounded-full px-6 py-2">
                Browse other categories
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image?.url ?? ""}
                title={product.title}
                price={typeof product.price === "number" ? product.price : 0}
                rating={product.rating ?? 0}
                isFavorite={favoriteIds.includes(product.id)}
                onAddToFavorites={toggleFavorite}
                className="w-full shrink"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
