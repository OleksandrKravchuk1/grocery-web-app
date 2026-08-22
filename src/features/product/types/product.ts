export type GetProductsParams = {
  search: string;
  limit?: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  rating?: number;
  image?: { url: string } | null;
  category_id?: number;
};