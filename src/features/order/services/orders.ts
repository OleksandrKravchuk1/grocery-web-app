"use server";

import { api } from "@/api/client";
import type { Order } from "../types/order";

export async function getUserOrders(): Promise<Order[]> {
  try {
    const { data } = await api.get("/orders");
    return data;
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
}
