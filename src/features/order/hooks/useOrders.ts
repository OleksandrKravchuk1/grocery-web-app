"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserOrders } from "../services/orders";
import type { Order } from "../types/order";

export function useOrders(initialOrders?: Order[]) {
  const { user } = useAuth();

  return useQuery<Order[]>({
    queryKey: QUERY_KEYS.orders(user?.id),
    queryFn: async () => {
      return getUserOrders();
    },
    initialData: initialOrders,
    enabled: !!user?.id || (initialOrders && initialOrders.length > 0),
  });
}
