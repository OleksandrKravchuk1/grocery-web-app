"use client";

import { FavoritesError } from "@/features/favorites/components/FavoritesError";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FavoritesPageError({ reset }: Props) {
  return <FavoritesError onRetry={reset} />;
}
