import { useQuery } from "@tanstack/react-query";
import { getProductsFn } from "@/services/products";
import { QUERY_KEYS } from "@/constants/queryKeys";

interface IUseProductsSearchOptions {
  search: string;
  limit?: number;
}

export default function useProductsSearch({
  search,
  limit,
}: IUseProductsSearchOptions) {
  return useQuery({
    queryKey: QUERY_KEYS.products(search),
    queryFn: () => getProductsFn({ search, limit }),
    enabled: !!search,
    staleTime: 60_000,
  });
}
