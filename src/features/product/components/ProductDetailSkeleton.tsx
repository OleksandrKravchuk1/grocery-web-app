import { BackButton } from "@/components/ui/BackButton";
import { ROUTES } from "@/constants/routes";

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <BackButton href={ROUTES.home} label="Back to Products" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Image skeleton */}
          <div className="aspect-square w-full rounded-3xl border border-zinc-200 bg-zinc-200/80 shadow-sm dark:border-zinc-800 dark:bg-zinc-900" />

          {/* Product info skeleton */}
          <div className="flex flex-col justify-center">
            {/* Rating skeleton */}
            <div className="mb-3 flex items-center gap-2">
              <div className="h-5 w-14 rounded-md bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-28 rounded-md bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Title skeleton */}
            <div className="mb-4 space-y-2.5">
              <div className="h-9 w-3/4 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-9 w-1/2 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Price skeleton */}
            <div className="mb-6 h-8 w-28 rounded-lg bg-zinc-200 dark:bg-zinc-800" />

            {/* Quantity skeleton */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-5 w-16 rounded-md bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-10 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Button skeleton */}
            <div className="mb-8 h-14 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />

            {/* Other info skeleton */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-1.5">
                  <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-1.5">
                  <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
