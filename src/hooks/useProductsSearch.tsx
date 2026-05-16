import { useQuery } from "@tanstack/react-query";
import { getProductsFn } from "@/services/products";

interface IUseProductsSearchOptions {
  search: string | null;
  limit?: number;
}

export default function useProductsSearch({
  search,
  limit = 10,
}: IUseProductsSearchOptions) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => getProductsFn({ search: search ?? "", limit }),
    enabled: !!search,
    staleTime: 60_000,
  });
}
