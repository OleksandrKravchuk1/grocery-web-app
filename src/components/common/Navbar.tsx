"use client";

import clsx from "clsx";
import {
  MenuIcon,
  ShoppingBasketIcon,
  UserRoundIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "@/components/common/Search";
import { Button } from "@/components/ui/Button";
import { navbarLinks } from "@/constants/navbar.constants";
import { ROUTES } from "@/constants/routes";
import useOpenState from "@/hooks/useOpenState";
import { useCart } from "@/features/cart/hooks/useCart";

const linkBaseClass = "block rounded-md px-3 py-2 transition-colors";
const iconBaseClass = "rounded-full p-2 transition-colors";

const Navbar = () => {
  const { totalItems } = useCart();
  const { isOpen, open, close } = useOpenState();
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const handleMobileNavClick = () => {
    close();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-gray-100 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 md:px-6 md:py-4">
      <div className="flex w-full items-center justify-between gap-4">
        <Link href={ROUTES.home} className="text-xl font-bold text-green-600">
          Grocery
        </Link>

        <Button
          type="button"
          variant="ghost"
          size="iconSm"
          className="md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={isOpen ? close : open}
        >
          {isOpen ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </Button>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navbarLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "transition-colors hover:text-green-600",
                    isActive(item.href) && "text-green-600",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={ROUTES.cart.root}
              className={clsx(
                iconBaseClass,
                isActive(ROUTES.cart.root)
                  ? "text-green-600"
                  : "hover:bg-green-600",
              )}
            >
              <ShoppingBasketIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-4 right-18 flex h-5 w-5 items-center justify-center 
                rounded-full bg-green-600 text-[8px] font-semibold text-white shadow-xs animate-in zoom-in-50 
                duration-200">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            <Link
              href={ROUTES.profile.root}
              className={clsx(
                iconBaseClass,
                isActive(ROUTES.profile.root)
                  ? "text-green-600"
                  : "hover:bg-green-600",
              )}
            >
              <UserRoundIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800 md:hidden">
          <div className="mb-4">
            <Search />
          </div>

          <ul className="flex flex-col gap-2">
            {navbarLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleMobileNavClick}
                  className={clsx(
                    linkBaseClass,
                    isActive(item.href) && "text-green-600",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li className="pt-2">
              <div className="flex items-center gap-3">
                <Link
                  href={ROUTES.cart.root}
                  onClick={handleMobileNavClick}
                  className={clsx(
                    linkBaseClass,
                    isActive(ROUTES.cart.root) && "text-green-600",
                  )}
                >
                  <ShoppingBasketIcon className="h-5 w-5" />
                  Cart
                </Link>
                <Link
                  href={ROUTES.profile.root}
                  onClick={handleMobileNavClick}
                  className={clsx(
                    linkBaseClass,
                    isActive(ROUTES.profile.root) && "text-green-600",
                  )}
                >
                  <UserRoundIcon className="h-5 w-5" />
                  Profile
                </Link>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
