"use client";

import { useState } from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PackageIcon,
} from "lucide-react";
import { useDeliveryStatus } from "../hooks/useDeliveryStatus";
import type { Order } from "../types/order";
import { formatOrderDate, formatPrice, getStatusConfig } from "../utils/orderStatus";
import { OrderTimeline } from "./OrderTimeline";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [showTimeline, setShowTimeline] = useState(true);

  // Poll live delivery status from simulation (auto stops when delivered)
  const initialStatus = order.deliveries?.status ?? order.status;
  const { data: delivery } = useDeliveryStatus(order.id, initialStatus);
  const currentStatus = delivery?.status ?? initialStatus ?? "pending";
  const statusConfig = getStatusConfig(currentStatus);


  const getImageUrl = (filename?: string) => {
    if (!filename) return null;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${filename}`;
  };

  const isOngoing =
    currentStatus === "pending" ||
    currentStatus === "processing" ||
    currentStatus === "shipped";

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 bg-zinc-50/50 p-4 px-6 dark:border-zinc-800 dark:bg-zinc-900/20 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <PackageIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Order #{order.id}
              </p>
              {isOngoing && (
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  Live
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <CalendarIcon className="h-3.5 w-3.5" />
              {formatOrderDate(order.created_at)}
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
          {/* Real-time status badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs transition-colors ${statusConfig.badgeClasses}`}
          >
            {statusConfig.pulse && (
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusConfig.dotColor} opacity-75`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${statusConfig.dotColor}`}
                />
              </span>
            )}
            {statusConfig.label}
          </span>
          <p className="font-bold text-zinc-900 dark:text-zinc-50">
            {formatPrice(order.total_price)}
          </p>
        </div>
      </div>

      {/* Real-time Order Timeline */}
      <div className="border-b border-zinc-100 p-4 px-6 dark:border-zinc-800/60">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowTimeline((prev) => !prev)}
            className="flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            <span>Tracking Progress</span>
            {showTimeline ? (
              <ChevronUpIcon className="h-3.5 w-3.5" />
            ) : (
              <ChevronDownIcon className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {showTimeline && (
          <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <OrderTimeline status={currentStatus} />
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="p-6">
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Items in your order ({order.order_items?.length || 0})
        </h4>
        <div className="space-y-3">
          {order.order_items?.map((item) => {
            const imageUrl = getImageUrl(item.products?.media?.filename);
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              >
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.products?.title || "Product"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <PackageIcon className="h-5 w-5 text-zinc-300 dark:text-zinc-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.products?.title || "Unknown Product"}
                  </h5>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatPrice(parseFloat(item.price || "0") * item.quantity)}
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
