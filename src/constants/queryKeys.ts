const buildKey = <T extends string, P>(base: T, param?: P) =>
  param !== undefined ? ([base, param] as const) : ([base] as const);

export const QUERY_KEYS = {
  favoriteProducts: (userId?: string) =>
    buildKey("favoriteProducts", userId),
  favoriteProductsData: (favoriteIds?: number[]) =>
    buildKey("favoriteProductsData", favoriteIds),
  products: (search?: string) =>
    buildKey("products", search),
  categoryProducts: (categoryId?: number) =>
    buildKey("categoryProducts", categoryId),
  categories: () => ["categories"] as const,
  profile: (userId?: string) =>
    buildKey("profile", userId),
} as const;
