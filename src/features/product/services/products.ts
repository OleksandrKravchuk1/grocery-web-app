"use server";

import { api } from "@/api/client";
import { GetProductsParams, Product } from "../types/product";
import { mapProduct } from "../utils/mapProduct";

export const getProductsFn = async ({
  search,
  limit = 10,
}: GetProductsParams): Promise<Product[]> => {
  const { data } = await api.get('/products');

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
  const { data } = await api.get('/products');

  return data.filter((p: any) => p.category_id === categoryId).map(mapProduct);
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) return [];

  const { data } = await api.get('/products');

  return data.filter((p: any) => ids.includes(p.id)).map(mapProduct);
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const { data } = await api.get(`products/${id}`);

    return mapProduct(data);
  } catch (error) {
    console.error('Failed to fetch product', error);
    return null;
  }
}