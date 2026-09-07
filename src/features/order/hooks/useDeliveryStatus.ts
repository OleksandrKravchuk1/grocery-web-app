"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getDeliveryStatus } from "../services/orders";
import type { DeliveryStatus, DeliveryStatusResponse, Order } from "../types/order";

export function useDeliveryStatus(orderId: number | undefined, initialStatus?: string) {
  const queryClient = useQueryClient();

  return useQuery<DeliveryStatusResponse>({
    queryKey: QUERY_KEYS.deliveryStatus(orderId),
    queryFn: async () => {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      const data = await getDeliveryStatus(orderId);

      // Keep the orders list cache synchronized with the latest delivery status
      queryClient.setQueriesData<Order[]>(
        { queryKey: ["orders"] },
        (oldOrders) => {
          if (!oldOrders) return oldOrders;
          return oldOrders.map((o) => {
            if (o.id === orderId) {
              return {
                ...o,
                status: data.status,
                deliveries: o.deliveries
                  ? { ...o.deliveries, status: data.status }
                  : {
                      id: orderId,
                      order_id: orderId,
                      status: data.status,
                      current_lat: data.location?.latitude ?? null,
                      current_lng: data.location?.longitude ?? null,
                    },
              };
            }
            return o;
          });
        },
      );

      return data;
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
