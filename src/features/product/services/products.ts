"use server";

import { api } from "@/api/client";
import { GetProductsParams, Product } from "../types/product";
import { mapProduct } from "../utils/mapProduct";

export const getProductsFn = async ({
  search,
  limit = 10,
}: GetProductsParams): Promise<Product[]> => {
  const { data } = await api.get('/products', {
    params: {
      search: search || undefined,
      take: limit,
    },
  });

  return data.map(mapProduct);
};

export async function getProductsByCategoryId(
  categoryId: number,
): Promise<Product[]> {
  const { data } = await api.get('/products', {
    params: {
      categoryId,
      take: 50,
    },
  });

  return data.map(mapProduct);
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) return [];

  const { data } = await api.get('/products');

  return data.filter((p: any) => ids.includes(p.id)).map(mapProduct);
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const { data } = await api.get(`/products/${id}`);

    return mapProduct(data);
  } catch (error) {
    console.error('Failed to fetch product', error);
    return null;
  }
}
