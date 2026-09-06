"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, LockIcon, ShieldCheckIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { createOrder } from "@/features/order/services/orders";
import type { CartSummaryProps } from "../types/cart";

export function CartSummary({
  items,
  totalPrice,
  totalItems,
  deliveryFee = 0,
  clearCart,
}: CartSummaryProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const finalTotal = totalPrice + deliveryFee;

  const handleCheckout = async () => {
    if (!user?.id) {
      router.push(ROUTES.auth.signIn);
      return;
    }

    if (items.length === 0) return;

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const payload = {
        totalPrice: finalTotal,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: Number(item.product.price),
        })),
      };

      await createOrder(payload);

      clearCart();
      router.push(ROUTES.orders?.root || "/orders");
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sticky top-24 rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
        Order Summary
      </h3>

      {/* Details breakdown */}
      <div className="mt-6 space-y-3 border-b border-zinc-100 pb-6 text-sm dark:border-zinc-800/80">
        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
          <span>Items ({totalItems})</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
          <span>Delivery</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>
      </div>
      <div className="my-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Total amount
          </p>
          <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
            ${finalTotal.toFixed(2)}
          </p>
        </div>
        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          VAT included
        </span>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading || items.length === 0}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3.5 font-bold text-white shadow-sm transition-all hover:bg-emerald-500 active:scale-98 disabled:pointer-events-none disabled:opacity-50"
      >
        {isLoading ? (
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : !user?.id ? (
          <>
            <LockIcon className="h-4 w-4" />
            <span>Sign In to Checkout</span>
          </>
        ) : (
          <>
            <span>Place Order</span>
            <ArrowRightIcon className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Trust Badge */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
        <ShieldCheckIcon className="h-4 w-4 text-emerald-500" />
        <span>Secure checkout guaranteed</span>
      </div>
    </div>
  );
}