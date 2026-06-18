"use server";

import { prisma } from "@/lib/prisma";

export type GetProductsParams = {
  search: string;
  limit?: number;
};

export const getProductsFn = async ({ search, limit = 10 }: GetProductsParams) => {
  const products = await prisma.product.findMany({
    where: { title: { contains: search, mode: "insensitive" } },
    select: { id: true, title: true, price: true },
    take: limit,
  });

  return products.map(product => ({
    ...product,
    price: product.price.toNumber(),
  }));
};

export async function getProductsByCategoryId(categoryId: number) {
  const products = await prisma.product.findMany({
    where: { categoryId },
    include: { image: true },
  });

  return products.map(product => ({
    ...product,
    price: product.price.toNumber(),
  }));
}

export async function getProductsByIds(ids: number[]) {
  if (ids.length === 0) return [];

  const data = await prisma.product.findMany({
    where: { id: { in: ids } },
    include: { image: true },
  });

  const productMap = new Map((data ?? []).map((p) => [p.id, { ...p, price: p.price.toNumber() }]));
  return ids.map((id) => productMap.get(id)).filter(Boolean);
}
