export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  products: {
    id: number;
    title: string;
    media: {
      id: number;
      filename: string;
      mime_type: string;
    } | null;
  };
};

export type Order = {
  id: number;
  user_id: string;
  total_price: string;
  status: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
};
