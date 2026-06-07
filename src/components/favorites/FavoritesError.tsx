import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
      <Button
        variant="dark"
        onClick={onRetry}
        className="h-auto rounded-full px-6 py-2.5 font-semibold"
      >
        <RefreshCwIcon size={14} />
        Try again
      </Button>
    </div>
  );
}
