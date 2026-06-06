"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useFavoriteProducts } from "@/hooks/useFavoriteProducts";
import { getProductsByIds } from "@/services/products";
import { QUERY_KEYS } from "@/constants/queryKeys";

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
  const products = rawProducts.filter((product) => product && favoriteIds.includes(product.id));

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
