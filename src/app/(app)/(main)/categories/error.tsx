"use client";

import { useEffect } from "react";
import { CategoryPageError } from "@/features/category/components/CategoryPageError";

interface CategoriesPageErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CategoriesPageError({
  error,
  reset,
}: CategoriesPageErrorProps) {
  useEffect(() => {
    console.error("CategoriesPageError:", error);
  }, [error]);

  return <CategoryPageError onRetry={reset} />;
}
