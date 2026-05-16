import { useQuery } from "@tanstack/react-query";
import { getProductsFn } from "@/services/products";

interface IUseProductsSearchOptions {
  search: string;
  limit?: number;
}

export default function useProductsSearch({
  search,
  limit,
}: IUseProductsSearchOptions) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => getProductsFn({ search, limit }),
    enabled: !!search,
    staleTime: 60_000,
  });
}
