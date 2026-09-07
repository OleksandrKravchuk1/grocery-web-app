"use client";

import { useMemo, useState } from "react";
import { PackageIcon, RefreshCwIcon } from "lucide-react";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../types/order";
import { OrderCard } from "./OrderCard";

interface OrderListProps {
  orders: Order[];
}

type TabFilter = "all" | "active" | "completed";

function getOrderStatus(order: Order): string {
  return (order.deliveries?.status || order.status || "pending").toLowerCase();
}

export function OrderList({ orders: initialOrders }: OrderListProps) {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const { data: orders = initialOrders, isFetching, refetch } = useOrders(initialOrders);

  const { activeCount, completedCount } = useMemo(() => {
    if (!orders?.length) return { activeCount: 0, completedCount: 0 };
    let active = 0;
    let completed = 0;
    for (const o of orders) {
      const s = getOrderStatus(o);
      if (s === "delivered" || s === "completed" || s === "cancelled") {
        completed++;
      } else {
        active++;
      }
    }
    return { activeCount: active, completedCount: completed };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (!orders?.length) return [];

    if (activeTab === "all") return orders;

    if (activeTab === "active") {
      return orders.filter((o) => {
        const s = getOrderStatus(o);
        return (
          s === "pending" ||
          s === "processing" ||
          s === "shipped" ||
          s === "delivering" ||
          s === "in_transit"
        );
      });
    }

    if (activeTab === "completed") {
      return orders.filter((o) => {
        const s = getOrderStatus(o);
        return (
          s === "delivered" ||
          s === "completed" ||
          s === "cancelled"
        );
      });
    }

    return orders;
  }, [orders, activeTab]);

  if (!orders?.length) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 mb-4">
          <PackageIcon className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          No orders yet
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          When you place an order, it will appear here with live tracking updates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Filter Bar & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900 self-start">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "all"
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            All ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "active"
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            In Progress ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "completed"
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-1.5 self-end sm:self-auto rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
        >
          <RefreshCwIcon
            className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-emerald-500" : ""}`}
          />
          <span>{isFetching ? "Updating..." : "Refresh"}</span>
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="flex min-h-62.5 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            No orders found in this category.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
