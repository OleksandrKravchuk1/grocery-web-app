import { supabase } from "@/lib/supabase/client";

export type GetProductsParams = {
  search: string;
  limit?: number;
};

export const getProductsFn = async ({
  search,
  limit = 10,
}: GetProductsParams) => {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,price")
    .ilike("name", `%${search}%`)
    .limit(limit);

  if (error) throw error;
  return data ?? [];
};

export async function getProductsByCategoryId(category_id: number) {
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq('category_id', category_id);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getProductsByIds(ids: number[]) {
  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from('products')
    .select()
    .in('id', ids);

  if (error) {
    throw new Error(error.message);
  }

  // Preserve the order from `ids` (most recently favorited first)
  const productMap = new Map((data ?? []).map((p) => [p.id, p]));
  return ids.map((id) => productMap.get(id)).filter(Boolean);
}