export const ROUTES = {
  home: "/",
  categories: {
    root: "/categories",
    category: (id: string) => `/categories/${id}`,
  },
  favorites: {
    root: "/favorites",
    favorite: (id: string) => `/favorites/${id}`,
  },
  orders: {
    root: "/orders",
    order: (id: string) => `/orders/${id}`,
  },
  products: {
    root: "/products",
    product: (id: string) => `/products/${id}`,
  },
  cart: {
    root: "/cart",
  },
  profile: {
    root: "/profile",
  },
} as const;

export const navbarLinks = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.categories.root, label: "Categories" },
  { href: ROUTES.favorites.root, label: "Favorites" },
  { href: ROUTES.orders.root, label: "Orders" },
];
