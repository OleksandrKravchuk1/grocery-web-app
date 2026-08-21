import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getProductsByCategoryId } from "@/features/product/services/products";

export function useProductsByCategoryId(categoryId: number) {
  const query = useQuery({
    queryKey: QUERY_KEYS.categoryProducts(categoryId),
    queryFn: () => getProductsByCategoryId(categoryId),
    enabled: Number.isFinite(categoryId),
  });

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error instanceof Error ? query.error.message : null,
  };
}
