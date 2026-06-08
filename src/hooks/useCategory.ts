import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories";
import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";

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