import { notFound } from "next/navigation";
import { getProductById } from "@/features/product/services/products";
import { ProductDetailView } from "@/features/product/components/ProductDetailView";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
