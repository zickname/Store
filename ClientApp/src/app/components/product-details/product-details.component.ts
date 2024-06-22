import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartProduct } from 'src/app/models/cart-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  apiUrl = '';
  product!: Product;
  cartProducts: CartProduct[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Product; cartProducts: CartProduct[] },
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.apiUrl = environment.apiHost;
    this.product = this.data.product;
    this.cartProducts = this.data.cartProducts;
  }

  changeQuantity(productId: number, quantity: number) {
    if (quantity < 0) return;

    this.cartService.changeQuantity(productId, quantity).subscribe(() => {
      const cartProduct = this.cartProducts.find(item => item.productId === productId);

      if (cartProduct) {
        if (quantity === 0) {
          this.cartProducts.splice(
            this.cartProducts.findIndex(item => item === cartProduct),
            1
          );
        } else {
          cartProduct.quantity = quantity;
        }
      } else {
        this.cartProducts.push({
          productId: this.product.id,
          name: this.product.name,
          price: this.product.price,
          quantity: quantity,
          images: this.product.images,
        });
      }
    });
  }

  getQuantity(productId: number): number {
    const item = this.cartProducts.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }
}
