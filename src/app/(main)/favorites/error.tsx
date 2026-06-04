'use client';

import { FavoritesError } from "./_components/FavoritesError";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return <FavoritesError onRetry={reset} />;
}
