"use server";

import { prisma } from "@/lib/prisma";

export type GetProductsParams = {
  search: string;
  limit?: number;
};

export const getProductsFn = async ({ search, limit = 10 }: GetProductsParams) => {
  return prisma.product.findMany({
    where: { title: { contains: search, mode: "insensitive" } },
    select: { id: true, title: true, price: true },
    take: limit,
  });
};

export async function getProductsByCategoryId(categoryId: number) {
  return prisma.product.findMany({
    where: { categoryId },
    include: { image: true },
  });
}
