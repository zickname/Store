import { OrderDetails } from './order-details';

export interface OrderRequestDto {
  address: string;
  products: OrderDetails[];
}

export interface OrderDto {
  id: number;
  userId: number;
  createDate: string;
  address: string;
  products: OrderDetails[];
  totalAmount: number;
}
