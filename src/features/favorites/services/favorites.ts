"use server";

import { api } from "@/api/client";

export async function addFavorite(_userId: string, productId: number) {
  try {
    const { data } = await api.post(`/favourites/${productId}`);
    return data.product_id;
  } catch (error) {
    console.error("Failed to add favorite:", error);
    throw error;
  }
}


export async function deleteFavorite(_userId: string, productId: number) {
  try {
    await api.delete(`/favourites/${productId}`);
    return productId;
  } catch (error) {
    console.error("Failed to delete favorite:", error);
    throw error;
  }
}


export async function getFavorites(_userId: string): Promise<number[]> {
  try {
    const { data } = await api.get("/favourites");
    return data.map((f: any) => f.product_id);
  } catch (error) {
    return [];
  }
}