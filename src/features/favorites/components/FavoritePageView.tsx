"use client";

import { useQueryClient } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";
import { ProductCard } from "@/features/product/components/ProductCard";
import { useFavoriteProductsData } from "@/features/favorites/hooks/useFavoriteProductsData";
import { FavoritesEmpty } from "./FavoritesEmpty";
import { FavoritesError } from "./FavoritesError";
import { FavoritesLoading } from "./FavoritesLoading";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function FavoritePageView() {
  const queryClient = useQueryClient();
  const {
    products,
    favoriteIds,
    toggleFavorite,
    isEmpty,
    isError,
    isLoading,
  } = useFavoriteProductsData();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.favoriteProducts() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.favoriteProductsData() });
  };

  return (
    <main className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-950/40">
            <HeartIcon className="h-5 w-5 fill-pink-500 text-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              My Favorites
            </h1>
            {!isLoading && !isError && !isEmpty && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {favoriteIds.length}{" "}
                {favoriteIds.length === 1 ? "item" : "items"} saved
              </p>
            )}
          </div>
        </div>

        {isLoading && <FavoritesLoading />}

        {!isLoading && isError && <FavoritesError onRetry={handleRetry} />}

        {!isLoading && !isError && isEmpty && <FavoritesEmpty />}

        {!isLoading && !isError && !isEmpty && (
          <div className="flex flex-wrap gap-6">
            {products.map((product) => {
              if (!product) return null;
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image?.url ?? ""}
                  title={product.title}
                  price={Number(product.price)}
                  rating={product.rating ?? 0}
                  isFavorite={favoriteIds.includes(product.id)}
                  onAddToFavorites={toggleFavorite}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
