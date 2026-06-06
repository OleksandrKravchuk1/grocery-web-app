"use server";

import { prisma } from "@/lib/prisma";

export async function addFavorite(userId: string, productId: number) {
  const fav = await prisma.favourite.create({
    data: { userId, productId },
  });
  return fav.productId;
}

export async function deleteFavorite(userId: string, productId: number) {
  return prisma.favourite.deleteMany({
    where: { userId, productId },
  });
}

export async function getFavorites(userId: string): Promise<number[]> {
  const favs = await prisma.favourite.findMany({
    where: { userId },
    select: { productId: true },
    orderBy: { id: "desc" },
  });
  return favs.map((f) => f.productId).filter((id): id is number => id !== null);
}

export async function isFavourite(userId: string, productId: number) {
  return prisma.favourite.findFirst({
    where: { userId, productId },
  });
}