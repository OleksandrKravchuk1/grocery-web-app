"use client";

import { ShoppingBagIcon, Trash2Icon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useCart } from "../hooks/useCart";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export function CartPageView() {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans dark:bg-black md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <PageHeader
            title="Shopping Cart"
            description="Review your selected items and proceed to checkout"
            icon={<ShoppingBagIcon className="h-5 w-5" />}
          />

          {!isEmpty && (
            <button
              type="button"
              onClick={() => clearCart()}
              className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-600 shadow-xs hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-red-900/50 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-all cursor-pointer"
            >
              <Trash2Icon className="h-3.5 w-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10 items-start">
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Products ({totalItems})
                </span>
                <span className="text-xs text-zinc-400">
                  Prices are tax inclusive
                </span>
              </div>

              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="lg:col-span-1">
              <CartSummary
                items={items}
                totalPrice={totalPrice}
                totalItems={totalItems}
                clearCart={clearCart}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
