"use client";

import { useEffect } from "react";
import { OrderPageError } from "@/features/order/components/OrderPageError";

interface OrdersPageErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function OrdersPageError({
  error,
  reset,
}: OrdersPageErrorProps) {
  useEffect(() => {
    console.error("OrdersPageError:", error);
  }, [error]);

  return <OrderPageError onRetry={reset} />;
}
