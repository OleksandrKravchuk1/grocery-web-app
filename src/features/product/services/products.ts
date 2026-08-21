"use server";

import { api } from "@/api/client";

export type GetProductsParams = {
  search: string;
  limit?: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  rating?: number;
  image?: { url: string } | null;
  category_id?: number;
};

const mapProduct = (item: any): Product => ({
  ...item,
  price: parseFloat(item.price || 0),
  rating: parseFloat(item.rating || 0),
  image: item.media?.filename
    ? {
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${item.media.filename}`,
      }
    : null,
});

export const getProductsFn = async ({
  search,
  limit = 10,
}: GetProductsParams): Promise<Product[]> => {
  const { data } = await api.get("/products");

  let filtered = data;

  if (search) {
    filtered = filtered.filter((p: any) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return filtered.slice(0, limit).map(mapProduct);
};

export async function getProductsByCategoryId(
  categoryId: number,
): Promise<Product[]> {
  const { data } = await api.get("/products");

  return data.filter((p: any) => p.category_id === categoryId).map(mapProduct);
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) return [];

  const { data } = await api.get("/products");

  return data.filter((p: any) => ids.includes(p.id)).map(mapProduct);
}
