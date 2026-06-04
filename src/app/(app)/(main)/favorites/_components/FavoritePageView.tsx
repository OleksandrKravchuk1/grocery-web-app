'use client';

import { useFavoriteProductsData } from "@/hooks/useFavoriteProductsData";
import { Heart } from "lucide-react";
import { FavoritesEmpty } from "./FavoritesEmpty";
import { ProductCard } from "@/components/ProductCard";

export function FavoritePageView() {
  const {
    products,
    favoriteIds,
    toggleFavorite,
    isToggling,
    isEmpty,
  } = useFavoriteProductsData();

  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-950/40">
            <Heart className="h-5 w-5 fill-pink-500 text-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              My Favorites
            </h1>
            {!isEmpty && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {favoriteIds.length} {favoriteIds.length === 1 ? "item" : "items"} saved
              </p>
            )}
          </div>
        </div>

        {isEmpty && <FavoritesEmpty />}

        {!isEmpty && (
          <div className="flex flex-wrap gap-6">
            {products.map((product) => {
              if (!product) return null;
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={typeof product.price === "number" ? product.price : 0}
                  rating={product.rating ?? 0}
                  isFavorite={favoriteIds.includes(product.id)}
                  onAddToFavorites={toggleFavorite}
                />
              );
            })}
          </div>
        )}

        {isToggling && (
          <p aria-live="polite" className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
            Updating favorites…
          </p>
        )}

      </div>
    </main>
  );
}