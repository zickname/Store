import { Image } from './products';

export interface CartProduct {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  images: Image[];
}
