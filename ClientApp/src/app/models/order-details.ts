export interface OrderDetailsRequest {
  productId: number;
  price: number;
  quantity: number;
}

export interface OrderDetailsResponse {
  productId: number;
  price: number;
  quantity: number;
  imageUrl: string;
  name: string;
}
