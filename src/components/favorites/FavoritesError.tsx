import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";

type Props = {
  onRetry: () => void;
};

export function FavoritesError({ onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
        <AlertCircleIcon className="h-10 w-10 text-red-500" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Something went wrong
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          We couldn&apos;t load your favorites. Please try again.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-700 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        <RefreshCwIcon size={14} />
        Try again
      </button>
    </div>
  );
}
