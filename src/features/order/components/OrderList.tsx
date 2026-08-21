"use client";

import { PackageIcon } from "lucide-react";
import type { Order } from "../types/order";
import { OrderCard } from "./OrderCard";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  if (!orders?.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <PackageIcon className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          No orders yet
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          When you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
