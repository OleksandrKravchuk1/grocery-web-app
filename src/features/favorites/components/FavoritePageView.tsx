"use client";

import { useQueryClient } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useFavoriteProductsData } from "@/features/favorites/hooks/useFavoriteProductsData";
import { ProductCard } from "@/features/product/components/ProductCard";
import { FavoritesEmpty } from "./FavoritesEmpty";
import { FavoritesError } from "./FavoritesError";
import { FavoritesLoading } from "./FavoritesLoading";

export function FavoritePageView() {
  const queryClient = useQueryClient();
  const { products, favoriteIds, toggleFavorite, isEmpty, isError, isLoading } =
    useFavoriteProductsData();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.favoriteProducts() });
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.favoriteProductsData(),
    });
  };

  const description =
    !isLoading && !isError && !isEmpty
      ? `${favoriteIds.length} ${favoriteIds.length === 1 ? "item" : "items"} saved`
      : undefined;

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-in fade-in duration-500">
        <PageHeader
          title="My Favorites"
          description={description}
          icon={<HeartIcon className="h-5 w-5 fill-pink-500 text-pink-500" />}
          iconClassName="bg-pink-100 dark:bg-pink-950/40"
        />

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
    </div>
  );
}
