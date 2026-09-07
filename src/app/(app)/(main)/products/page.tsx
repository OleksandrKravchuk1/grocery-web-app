import { getCategories } from "@/features/category/services/categories";
import { ProductsPageView } from "@/features/product/components/ProductsPageView";
import { getProductsFn } from "@/features/product/services/products";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Products",
  description: "Products",
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProductsFn({ search: "", limit: 100 }),
    getCategories(),
  ]);

  return (
    <ProductsPageView
      initialProducts={products}
      categories={categories}
    />
  );
}