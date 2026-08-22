"use client";

import { useEffect } from "react";
import { CategoryDetailError } from "@/features/category/components/CategoryDetailError";

interface CategoryDetailPageErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CategoryDetailPageError({
  error,
  reset,
}: CategoryDetailPageErrorProps) {
  useEffect(() => {
    console.error("CategoryDetailPageError:", error);
  }, [error]);

  return <CategoryDetailError onRetry={reset} />;
}
