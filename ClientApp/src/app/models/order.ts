import { OrderDetails } from './order-details';

export interface Order {
  address: string;
  orderDetails: OrderDetails;
}
