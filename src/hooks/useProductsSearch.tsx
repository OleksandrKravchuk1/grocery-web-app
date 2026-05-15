import { useQuery } from '@tanstack/react-query';
import { getProductsFn } from '@/services/products';

export default function useProductsSearch(search: string | null, limit = 10) {
  return useQuery({
    queryKey: ['products', search],
    queryFn: () => getProductsFn({ search: search ?? '', limit }),
    enabled: !!search,
    staleTime: 60_000,
  });
}