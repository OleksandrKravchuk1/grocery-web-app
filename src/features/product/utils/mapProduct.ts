import { Product } from '../types/product';

export const mapProduct = (item: any): Product => ({
  ...item,
  price: parseFloat(item.price || 0),
  rating: parseFloat(item.rating || 0),
  image: item.media?.filename
    ? {
      url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${item.media.filename}`,
    }
    : null,
});