export const ROUTES = {
  home: "/",
  categories: {
    root: "/categories",
    category: (id: number) => `/categories/${id}`,
  },
  favorites: {
    root: "/favorites",
    favorite: (id: string | number) => `/favorites/${id}`,
  },
  orders: {
    root: "/orders",
    order: (id: string | number) => `/orders/${id}`,
  },
  products: {
    root: "/products",
    product: (id: string | number) => `/products/${id}`,
  },
  cart: {
    root: "/cart",
  },
  profile: {
    root: "/profile",
  },
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
  },
} as const;
