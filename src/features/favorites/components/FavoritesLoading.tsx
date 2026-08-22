import { ProductCardSkeleton } from "@/features/product/components/ProductCardSkeleton";

const SKELETON_COUNT = 5;

export function FavoritesLoading() {
  return (
    <div className="flex flex-wrap gap-6 sm:gap-8">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
