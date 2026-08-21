"use server";

import { api } from "@/api/client";

export type Category = {
  id: number;
  name: string;
  icon: string;
};

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get("/products/categories");
  return data;
}

export async function getCategoryById(id: number): Promise<Category | null> {
  try {
    const categories = await getCategories();
    return categories.find((c) => c.id === id) ?? null;
  } catch {
    return null;
  }
}
