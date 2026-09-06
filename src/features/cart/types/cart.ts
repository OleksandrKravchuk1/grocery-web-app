import { Product } from "@/features/product/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartItemRowProps {
  item: CartItem,
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  deliveryFee?: number;
  clearCart: () => void;
}