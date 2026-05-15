export const ROUTES = {
  home: "/",
  categories: "/categories",
  favorites: "/favorites",
  orders: "/orders",
  products: "/products",
  cart: "/cart",
  profile: "/profile",
} as const;

export const navbarLinks = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.categories, label: "Categories" },
  { href: ROUTES.favorites, label: "Favorites" },
  { href: ROUTES.orders, label: "Orders" },
];