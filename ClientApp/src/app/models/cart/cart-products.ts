import { Image } from "../products";

export interface CartProducts {
    id: string,
    productId: number,
    name: string,
    price: number,
    quantity: number,
    images: Image[]

}
