'use client'

import Image from "next/image";
import { CartItemRowProps } from "../types/cart";
import { MinusIcon, PackageIcon, PlusIcon, Trash2Icon } from "lucide-react";

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const { product, quantity } = item;

  const imageUrl = product.image?.url ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${product.image.url}`
    : null;

  const itemPrice = Number(product.price);
  const totalItemPrice = itemPrice * quantity;

  return (
    <div className='flex flex-col sm:flex-row  sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 
    shadow-xs transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950'>
      <div className='flex items-center gap-4 min-w-6'>
        <div className='relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-100
        bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
            />
          ) : (
            <PackageIcon className='h-8 w-8 text-zinc-300 dark:text-zinc-600' />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {product.title}
          </h4>
          <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            ${itemPrice.toFixed(2)} <span className="text-xs text-zinc-400">/ шт.</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800/60">
        <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => {
              if (quantity <= 1) {
                onRemove(product.id);
              } else {
                onUpdateQuantity(product.id, quantity - 1);
              }
            }}
            aria-label={quantity <= 1 ? "Видалити товар" : "Зменшити кількість"}
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {quantity <= 1 ? (
              <Trash2Icon className="h-3.5 w-3.5 text-red-500" />
            ) : (
              <MinusIcon className="h-3.5 w-3.5" />
            )}
          </button>
          <span className="w-8 text-center text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            aria-label="Збільшити кількість"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="text-right min-w-17.5">
          <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">
            ${totalItemPrice.toFixed(2)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onRemove(product.id)}
          aria-label="Видалити з кошика"
          className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}