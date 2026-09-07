import { Metadata } from "next";
import { CartPageView } from "@/features/cart/components/CartPageView";

export const metadata: Metadata = {
  title: "Shopping Cart | Grabber",
  description: "View items in your cart and complete your order",
};

export default function CartPage() {
  return <CartPageView />;
}
