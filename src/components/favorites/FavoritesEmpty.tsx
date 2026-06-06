import { HeartIcon } from "lucide-react";

export function FavoritesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-pink-50 dark:bg-pink-950/30">
        <HeartIcon
          className="h-12 w-12 text-pink-300 dark:text-pink-700"
          strokeWidth={1.5}
        />
        <span className="absolute inset-0 animate-ping rounded-full bg-pink-100 opacity-40 dark:bg-pink-900/20" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          No favorites yet
        </h2>
        <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
          Tap the heart on any product to save it here for quick access later.
        </p>
      </div>
    </div>
  );
}
