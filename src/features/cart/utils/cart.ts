import { Product } from "@/features/product/types/product";
import { CartItem } from "../types/cart";

export function addItemToCart(items: CartItem[], product: Product, quantity = 1): CartItem[] {
  const existing = items.find((item) => item.product.id === product.id);

  if (existing) {
    return items.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }
  return [...items, { product, quantity }];
}

export function removeItemFromCart(items: CartItem[], productId: number): CartItem[] {
  return items.filter((item) => item.product.id !== productId);
}

export function updateItemQuantityInCart(items: CartItem[], productId: number, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return removeItemFromCart(items, productId);
  }
  return items.map((item) =>
    item.product.id === productId ? { ...item, quantity } : item,
  );
}

export function calculateTotalItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function calculateTotalPrice(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
}