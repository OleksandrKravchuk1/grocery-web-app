"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckIcon,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { useFavoriteProducts } from "@/features/favorites/hooks/useFavoriteProducts";
import { Product } from "../types/product";
import { BackButton } from "@/components/ui/BackButton";
import { useCart } from "@/features/cart/hooks/useCart";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { favoriteIds, toggleFavorite } = useFavoriteProducts();

  const isFavorite = favoriteIds.includes(product.id);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 500)
  }
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-in fade-in duration-500">

        <BackButton href={ROUTES.home} label="Back to Products" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">

          {/* Image of the product */}
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border 
          border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            {product.image?.url ? (
              <Image
                src={product.image.url}
                alt={product.title}
                fill
                className="object-contain p-8 transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="text-zinc-400">No Image Available</div>
            )}

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full 
              bg-white/80 backdrop-blur-md shadow-md transition hover:scale-110 active:scale-95 dark:bg-zinc-900/80 cursor-pointer"
            >
              <Heart
                className={`h-6 w-6 transition-colors ${isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-zinc-500 dark:text-zinc-400"
                  }`}
              />
            </button>
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-center">

            {/* Rating */}
            <div className="mb-2 flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-[#F5B300] text-[#F5B300]" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {product.rating ? product.rating.toFixed(1) : "5.0"}
              </span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                (Customer reviews)
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-green-600 dark:text-green-500">
                ${(product.price * quantity).toFixed(2)}
              </span>
              {quantity > 1 && (
                <span className="text-sm text-zinc-400">
                  (${product.price.toFixed(2)} each)
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8 flex items-center gap-4">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Quantity:
              </span>
              <div className="flex items-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <button
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-900 
                  disabled:opacity-30 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-bold text-zinc-900 dark:text-zinc-100">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="flex h-10 w-10 items-center justify-center text-zinc-500 hover:text-zinc-900 
                  dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <Button
              disabled={isAdded}
              onClick={handleAddToCart}
              className={`mb-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl text-lg font-semibold text-white shadow-lg transition-all duration-300 cursor-pointer ${isAdded
                ? "bg-emerald-700 shadow-emerald-700/20 scale-98"
                : "bg-green-600 shadow-green-600/20 hover:bg-green-700 active:scale-98"
                }`}
            >
              {isAdded ? (
                <>
                  <CheckIcon className="h-5 w-5 animate-in zoom-in duration-300 text-white" />
                  <span className="animate-in fade-in duration-300">Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </Button>


            {/* Other info */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 
                dark:bg-green-950/40 dark:text-green-400">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Fast Delivery
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Within 30-60 mins
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 
                dark:bg-green-950/40 dark:text-green-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Quality Guarantee
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    100% fresh products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
