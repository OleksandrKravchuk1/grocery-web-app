"use client";

import { ShoppingBasket, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "@/components/Search";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <nav className="sticky top-0 z-50 bg-gray-100 dark:bg-zinc-950 px-6 py-4">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="text-xl font-bold text-green-600">
          Grocery
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={
              isActive("/")
                ? "text-green-600"
                : "hover:text-green-600 transition-colors"
            }
          >
            Home
          </Link>
          <Link
            href="/categories"
            className={
              isActive("/categories")
                ? "text-green-600"
                : "hover:text-green-600 transition-colors"
            }
          >
            Categories
          </Link>
          <Link
            href="/favorites"
            className={
              isActive("/favorites")
                ? "text-green-600"
                : "hover:text-green-600 transition-colors"
            }
          >
            Favorites
          </Link>
          <Link
            href="/orders"
            className={
              isActive("/orders")
                ? "text-green-600"
                : "hover:text-green-600 transition-colors"
            }
          >
            Orders
          </Link>

          <div className="hidden md:block">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className={
                isActive("/cart")
                  ? "text-green-600"
                  : "p-2 hover:bg-green-600 rounded-full transition-colors"
              }
            >
              <ShoppingBasket className="h-5 w-5" />
            </Link>
            <Link
              href="/profile"
              className={
                isActive("/profile")
                  ? "text-green-600"
                  : "p-2 hover:bg-green-600 rounded-full transition-colors"
              }
            >
              <UserRound className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
