"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { Product } from "@/features/product/types/product";
import { getStoredCart, saveStoredCart } from "../services/cartStorage";
import { CartItem } from "../types/cart";
import { addItemToCart, calculateTotalItems, calculateTotalPrice, removeItemFromCart, updateItemQuantityInCart } from "../utils/cart";

export function useCart() {
  const queryClient = useQueryClient();

  const { data: items = [] } = useQuery<CartItem[]>({
    queryKey: QUERY_KEYS.cart(),
    queryFn: getStoredCart,
    staleTime: Infinity,
  });

  const updateCart = (newItems: CartItem[]) => {
    saveStoredCart(newItems);
    queryClient.setQueryData(QUERY_KEYS.cart(), newItems);
  };

  const addToCartMutation = useMutation({
    mutationFn: async ({ product, quantity = 1 }: { product: Product, quantity?: number }) => {
      const updated = addItemToCart(items, product, quantity);
      updateCart(updated);
      return updated;
    },
  })

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      const updated = removeItemFromCart(items, productId);
      updateCart(updated);
      return updated;
    },
  });
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number, quantity: number }) => {
      const updated = updateItemQuantityInCart(items, productId, quantity);
      updateCart(updated);
      return updated;
    },
  });
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      updateCart([]);
      return [];
    },
  });

  const totalItems = useMemo(() => calculateTotalItems(items), [items]);
  const totalPrice = useMemo(() => calculateTotalPrice(items), [items]);

  return {
    items,
    totalItems,
    totalPrice,
    addToCart: (product: Product, quantity?: number) =>
      addToCartMutation.mutate({ product, quantity }),
    removeFromCart: (productId: number) =>
      removeFromCartMutation.mutate(productId),
    updateQuantity: (productId: number, quantity: number) =>
      updateQuantityMutation.mutate({ productId, quantity }),
    clearCart: () => clearCartMutation.mutate(),
  };
}
