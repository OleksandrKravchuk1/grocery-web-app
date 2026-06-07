"use client";

import { FavoritesError } from "@/components/favorites/FavoritesError";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FavoritesPageError({ reset }: Props) {
  return <FavoritesError onRetry={reset} />;
}
