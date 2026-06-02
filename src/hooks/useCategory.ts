import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories";
import type { Category } from "@/types/category";

export function useCategories() {
    const query = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    return {
        categories: (query.data ?? []) as Category[],
        isLoading: query.isLoading,
        isError: query.isError,
    };
}