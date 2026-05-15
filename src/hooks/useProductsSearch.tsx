import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export default function useProductsSearch(search: string | null, limit = 10) {
  return useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id,name,slug,price')
        .ilike('name', `%${search}%`)
        .limit(limit);

      if (error) throw error;
      return data ?? [];
    },
    enabled: !!search,
    staleTime: 60_000,
  });
}