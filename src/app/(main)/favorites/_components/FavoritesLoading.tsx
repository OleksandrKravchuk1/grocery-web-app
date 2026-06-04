import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function FavoritesLoading() {
  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
