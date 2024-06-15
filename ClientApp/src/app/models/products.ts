export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: Image[];
}

export interface Image {
  imageId: number;
  imagePath: string;
}
