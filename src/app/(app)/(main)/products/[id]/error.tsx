"use client";

import { useEffect } from "react";
import { ProductDetailError } from "@/features/product/components/ProductDetailError";

interface ProductPageErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductPageError({
  error,
  reset,
}: ProductPageErrorProps) {
  useEffect(() => {
    console.error("ProductPageError:", error);
  }, [error]);

  return <ProductDetailError onRetry={reset} />;
}
