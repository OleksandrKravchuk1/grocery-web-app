"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useFavoriteProducts } from "@/features/favorites/hooks/useFavoriteProducts";
import { getProductsByIds } from "@/features/product/services/products";

export function useFavoriteProductsData() {
  const {
    favoriteIds,
    toggleFavorite,
    isLoading: isIdsLoading,
    isError: isIdsError,
    isToggling,
  } = useFavoriteProducts();

  const productsQuery = useQuery({
    queryKey: QUERY_KEYS.favoriteProductsData(favoriteIds),
    queryFn: () => getProductsByIds(favoriteIds),
    enabled: !isIdsLoading && !isIdsError,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const isLoading = isIdsLoading || productsQuery.isLoading;
  const isError = isIdsError || productsQuery.isError;
  const isEmpty = !isLoading && !isError && favoriteIds.length === 0;

  const rawProducts = productsQuery.data ?? [];
  const products = rawProducts.filter(
    (product) => product && favoriteIds.includes(product.id),
  );

  return {
    products,
    favoriteIds,
    toggleFavorite,
    isToggling,
    isLoading,
    isError,
    isEmpty,
  };
}
