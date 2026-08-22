"use server";

import { api } from "@/api/client";
import type { CreateOrderPayload, Order } from "../types/order";

export async function getUserOrders(): Promise<Order[]> {
  try {
    const { data } = await api.get("/orders");
    return data;
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  try {
    const { data } = await api.post("/orders", payload);
    return data;
  } catch (error: any) {
    console.error("Failed to create order:", error);
    const message =
      error.response?.data?.message || error.message || "Failed to create order";
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
}
