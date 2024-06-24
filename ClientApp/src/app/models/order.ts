import { OrderDetailsRequest, OrderDetailsResponse } from './order-details';

export interface OrderRequestDto {
  address: string;
  products: OrderDetailsRequest[];
}

export interface OrderDto {
  id: number;
  userId: number;
  createDate: string;
  address: string;
  products: OrderDetailsResponse[];
  totalAmount: number;
}
