"use client";

import { useMemo, useState } from "react";
import { PackageOpen, SearchIcon, ShoppingBagIcon, XIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import type { Category } from "@/features/category/services/categories";
import { useFavoriteProducts } from "@/features/favorites/hooks/useFavoriteProducts";
import { ProductCard } from "@/features/product/components/ProductCard";
import type { Product } from "@/features/product/types/product";

interface ProductsPageViewProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductsPageView({
  initialProducts,
  categories,
}: ProductsPageViewProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const { favoriteIds, toggleFavorite } = useFavoriteProducts();

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesCategory =
        selectedCategory === "all" || product.category_id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-in fade-in duration-500">
        <PageHeader
          title="All Products"
          description="Explore our full selection of fresh groceries"
          icon={<ShoppingBagIcon className="h-5 w-5" />}
        />

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by title..."
              className="w-full rounded-2xl border border-zinc-200 bg-white py-2.5 pl-10 pr-10 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-600/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${selectedCategory === "all"
                ? "bg-green-600 text-white shadow-xs"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
            >
              All ({initialProducts.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${selectedCategory === cat.id
                  ? "bg-green-600 text-white shadow-xs"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
              <PackageOpen className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              No products found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              We couldn&apos;t find any products matching your search criteria.
            </p>
            {(search || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="mt-6 rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 transition-colors"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
            {filteredProducts.map((product) => (
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
