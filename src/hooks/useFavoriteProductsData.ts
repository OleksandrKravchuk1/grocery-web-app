'use client';

import { useQuery } from "@tanstack/react-query";
import { useFavoriteProducts } from "@/hooks/useFavoriteProducts";
import { getProductsByIds } from "@/services/products";

export function useFavoriteProductsData() {
  const {
    favoriteIds,
    toggleFavorite,
    refetch: refetchIds,
    isLoading: isIdsLoading,
    isError: isIdsError,
    isToggling,
  } = useFavoriteProducts();

  const productsQuery = useQuery({
    queryKey: ["favoriteProductsData", favoriteIds],
    queryFn: () => getProductsByIds(favoriteIds),
    enabled: !isIdsLoading && !isIdsError,
    staleTime: 1000 * 60,
  });

  const refetch = () => {
    void refetchIds();
    void productsQuery.refetch();
  };

  return {
    products: productsQuery.data ?? [],
    favoriteIds,
    toggleFavorite,
    refetch,
    isToggling,
    isLoading: isIdsLoading || productsQuery.isLoading,
    isError: isIdsError || productsQuery.isError,

      !isIdsLoading &&
      !isIdsError &&
      !productsQuery.isLoading &&
      favoriteIds.length === 0,
  };
}
