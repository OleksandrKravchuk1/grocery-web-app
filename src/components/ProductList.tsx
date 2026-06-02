import { useProductsByCategoryId } from "@/hooks/useProductsByCategoryId";
import { ProductCard } from "./ProductCard";

type Props = {
  categoryId: number;
};

export function ProductList({ categoryId }: Props) {
  const { products, error, isError, isLoading } = useProductsByCategoryId(categoryId);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-6 text-gray-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        Loading products...
      </div>
    );
  }

  if (error || isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
        Failed to load products.
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-6 overflow-x-auto snap-x snap-mandatory px-4 py-2 scrollbar-hide sm:px-0 sm:gap-8">
      {products.map((product) => (
        <div key={product.id} className="min-w-44 shrink-0 snap-start">
          <ProductCard
            id={product.id}
            image={product.image}
            title={product.title}
            price={typeof product.price === "number" ? product.price : 0}
            rating={product.rating ?? 0}
            isFavorite={false}
            onAddToFavorites={(id) => console.log(`Add product ${id} to favorites`)}
          />
        </div>
      ))}
    </div>
  );
}