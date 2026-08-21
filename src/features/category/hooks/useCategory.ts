import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getCategories } from "@/features/category/services/categories";
import type { Category } from "@/features/category/types/category";

export function useCategories() {
  const query = useQuery({
    queryKey: QUERY_KEYS.categories(),
    queryFn: getCategories,
  });

  return {
    categories: (query.data ?? []) as Category[],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
