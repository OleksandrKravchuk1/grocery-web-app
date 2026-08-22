import { BackButton } from "@/components/ui/BackButton";
import { ROUTES } from "@/constants/routes";
import { ProductCardSkeleton } from "@/features/product/components/ProductCardSkeleton";

const SKELETON_COUNT = 10;

export function CategoryDetailSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8">
          <BackButton href={ROUTES.categories.root} label="All categories" />

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-8 w-44 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-32 rounded-md bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ProductCardSkeleton key={i} className="w-full shrink" />
          ))}
        </div>
      </div>
    </div>
  );
}
