import { Image, Product } from '../products';

export interface CartProduct {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  images: Image[];
}
