import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "w-44 shrink-0 rounded-[14px] bg-white p-4 shadow-sm animate-pulse dark:border dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <div className="mb-4 h-32 rounded-[14px] bg-gray-200 dark:bg-zinc-800" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-zinc-800" />
        <div className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-zinc-800" />
        <div className="h-5 w-1/2 rounded-md bg-gray-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
