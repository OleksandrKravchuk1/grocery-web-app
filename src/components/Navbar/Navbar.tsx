"use client";

import {
  MenuIcon,
  ShoppingBasketIcon,
  UserRoundIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Search from "@/components/Search";
import { navbarLinks, ROUTES } from "./navbar.constants";

const linkClass = (active: boolean) =>
  active ? "text-green-600" : "transition-colors hover:text-green-600";

const iconLinkClass = (active: boolean) =>
  active
    ? "text-green-600"
    : "rounded-full p-2 transition-colors hover:bg-green-600";

const mobileLinkClass = (active: boolean) =>
  active
    ? "block rounded-md px-3 py-2 text-green-600"
    : "block rounded-md px-3 py-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-gray-100 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 md:px-6 md:py-4">
      <div className="flex w-full items-center justify-between gap-4">
        <Link href={ROUTES.home} className="text-xl font-bold text-green-600">
          Grocery
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((value) => !value)}
        >
          {mobileMenuOpen ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navbarLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClass(isActive(item.href))}
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
              href={ROUTES.cart}
              className={iconLinkClass(isActive(ROUTES.cart))}
            >
              <ShoppingBasketIcon className="h-5 w-5" />
            </Link>
            <Link
              href={ROUTES.profile}
              className={iconLinkClass(isActive(ROUTES.profile))}
            >
              <UserRoundIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
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
                  className={
                    isActive(item.href)
                      ? "block rounded-md px-3 py-2 text-green-600"
                      : "block rounded-md px-3 py-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li className="pt-2">
              <div className="flex items-center gap-3">
                <Link
                  href={ROUTES.cart}
                  onClick={handleMobileNavClick}
                  className={mobileLinkClass(isActive(ROUTES.cart))}
                >
                  <ShoppingBasketIcon className="h-5 w-5" />
                  Cart
                </Link>
                <Link
                  href={ROUTES.profile}
                  onClick={handleMobileNavClick}
                  className={mobileLinkClass(isActive(ROUTES.profile))}
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
