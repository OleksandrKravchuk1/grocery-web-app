import { ProductCardSkeleton } from "@/components/favorites/ProductCardSkeleton";

const SKELETON_COUNT = 6;

export function FavoritesLoading() {
  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
