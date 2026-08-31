export type DeliveryStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface DeliveryLocation {
  latitude: number;
  longitude: number;
}

export interface DeliveryStatusResponse {
  status: DeliveryStatus;
  location: DeliveryLocation | null;
}

export interface TimelineStep {
  id: DeliveryStatus;
  aliases: string[];
  label: string;
  subLabel: string;
}

export const DELIVERY_STEPS: TimelineStep[] = [
  {
    id: "pending",
    aliases: ["pending"],
    label: "Order Placed",
    subLabel: "Your order has been received",
  },
  {
    id: "processing",
    aliases: ["processing"],
    label: "Preparing",
    subLabel: "Restaurant is preparing your order",
  },
  {
    id: "shipped",
    aliases: ["shipped", "delivering"],
    label: "On The Way",
    subLabel: "Courier is delivering your order",
  },
  {
    id: "delivered",
    aliases: ["delivered", "completed"],
    label: "Delivered",
    subLabel: "Order delivered successfully",
  },
];
