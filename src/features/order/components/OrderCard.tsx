"use client";

import { CalendarIcon, MapPinIcon, PackageIcon } from "lucide-react";
import type { Order } from "../types/order";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-500";
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-500";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-500";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  const getImageUrl = (filename?: string) => {
    if (!filename) return null;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${filename}`;
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 bg-zinc-50/50 p-4 px-6 dark:border-zinc-800 dark:bg-zinc-900/20 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-500">
            <PackageIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Order #{order.id}
            </p>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <CalendarIcon className="h-3 w-3" />
              {new Date(order.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(order.status)}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            ${parseFloat(order.total_price).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="p-6">
        <h4 className="mb-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Items in your order
        </h4>
        <div className="space-y-4">
          {order.order_items.map((item) => {
            const imageUrl = getImageUrl(item.products?.media?.filename);
            return (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.products.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <PackageIcon className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                    {item.products?.title || "Unknown Product"}
                  </h5>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Qty: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
