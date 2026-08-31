import { DELIVERY_STEPS, type DeliveryStatus } from "../types/delivery";

export interface StatusConfig {
  id: DeliveryStatus | "cancelled" | "unknown";
  label: string;
  badgeClasses: string;
  dotColor: string;
  pulse: boolean;
  description: string;
}

export function getStatusConfig(rawStatus?: string): StatusConfig {
  const status = rawStatus?.toLowerCase().trim() || "pending";

  switch (status) {
    case "pending":
      return {
        id: "pending",
        label: "Pending",
        badgeClasses:
          "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
        dotColor: "bg-amber-500",
        pulse: true,
        description: "Order received, awaiting preparation",
      };
    case "processing":
    case "preparing":
      return {
        id: "processing",
        label: "Preparing",
        badgeClasses:
          "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50",
        dotColor: "bg-blue-500",
        pulse: true,
        description: "Restaurant is preparing your order",
      };
    case "shipped":
    case "delivering":
    case "in_transit":
      return {
        id: "shipped",
        label: "On the way",
        badgeClasses:
          "bg-purple-50 text-purple-700 border-purple-200/80 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/50",
        dotColor: "bg-purple-500",
        pulse: true,
        description: "Courier is on the way to your address",
      };
    case "delivered":
    case "completed":
      return {
        id: "delivered",
        label: "Delivered",
        badgeClasses:
          "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50",
        dotColor: "bg-emerald-500",
        pulse: false,
        description: "Order delivered successfully",
      };
    case "cancelled":
      return {
        id: "cancelled",
        label: "Cancelled",
        badgeClasses:
          "bg-red-50 text-red-700 border-red-200/80 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50",
        dotColor: "bg-red-500",
        pulse: false,
        description: "Order was cancelled",
      };
    default:
      return {
        id: "unknown",
        label: rawStatus ? rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1) : "Pending",
        badgeClasses:
          "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800",
        dotColor: "bg-zinc-400",
        pulse: false,
        description: "",
      };
  }
}

export function getActiveStepIndex(rawStatus?: string): number {
  const status = rawStatus?.toLowerCase().trim() || "pending";
  if (status === "cancelled") return -1;

  const index = DELIVERY_STEPS.findIndex(
    (step) => step.id === status || step.aliases.includes(status),
  );

  return index >= 0 ? index : 0;
}

export function formatOrderDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

export function formatPrice(price: string | number | undefined | null): string {
  const numeric = typeof price === "string" ? parseFloat(price) : Number(price);
  return isNaN(numeric) ? "$0.00" : `$${numeric.toFixed(2)}`;
}
