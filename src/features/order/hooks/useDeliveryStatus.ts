"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getDeliveryStatus } from "../services/orders";
import type { DeliveryStatus, DeliveryStatusResponse } from "../types/order";

export function useDeliveryStatus(orderId: number | undefined, initialStatus?: string) {
  return useQuery<DeliveryStatusResponse>({
    queryKey: QUERY_KEYS.deliveryStatus(orderId),
    queryFn: async () => {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      return getDeliveryStatus(orderId);
    },
    initialData: initialStatus
      ? {
          status: initialStatus as DeliveryStatus,
          location: null,
        }
      : undefined,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "delivered" || status === "cancelled") {
        return false;
      }
      return 3000;
    },
    enabled: typeof orderId === "number" && orderId > 0,
  });
}
