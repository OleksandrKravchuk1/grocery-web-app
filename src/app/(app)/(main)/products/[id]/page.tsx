import { notFound } from "next/navigation";
import { isNumberRegex } from "@/constants/regex";
import { ProductPageView } from "@/components/products/ProductPageView";

type Props = {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  if (!isNumberRegex.test(id)) {
    notFound();
  }
  const productId = Number(id);

  return <ProductPageView productId={productId} />
}