import { ImageIcon, ShoppingBasketIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getProductById } from "@/services/products";
import { notFound } from "next/navigation";

type ProductPageViewProps = {
  productId: number;
}

export async function ProductPageView({ productId }: ProductPageViewProps) {
  const product = await getProductById(productId);
  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-8 shadow-sm 
        dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
          {product.image?.url ? (
            <Image
              className="max-h-full max-w-full object-contain"
              src={product.image.url}
              alt={product.title}
              width={400}
              height={400}
              unoptimized
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-zinc-400 dark:text-zinc-600">
              <ImageIcon size={64} strokeWidth={1.5} />
              <span className="text-sm font-medium">No image available</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <StarIcon className="fill-amber-400 text-amber-400" size={20} />
              <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                {product.rating?.toFixed(1) ?? "0.0"}
              </span>
            </div>

            <p className="text-3xl font-black text-black dark:text-white mb-6">
              {`$${product.price.toFixed(2)}`}
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              This is a beautiful {product.title}
            </p>
          </div>

          <div className="mt-8">
            <Button variant="dark" className="w-full py-4 text-base font-semibold rounded-xl">
              <ShoppingBasketIcon className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}