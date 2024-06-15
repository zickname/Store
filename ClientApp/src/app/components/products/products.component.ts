import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/models/cart/cart-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cart: CartProduct[] = [];
  productsSubscription?: Subscription;
  cartSubscription?: Subscription;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productsSubscription = this.productService
      .getProducts()
      .subscribe((data) => {
        this.products = data;
      });

    this.cartSubscription = this.cartService.getCart().subscribe((data) => {
      this.cart = data;
    });
  }

  ngOnDestroy() {
    this.productsSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }

  getQuantity(productId: number): number {
    const item = this.cart.find((item) => item.productId === productId);

    console.log(item);
    return item ? item.quantity : 0;
  }

  changeQuantity(productId: number, quantity: number) {
    if (quantity < 0) return;

    this.cartService.changeQuantity(productId, quantity).subscribe(() => {
      const cartProduct = this.cart.find(
        (item) => item.productId === productId
      );

      if (cartProduct) {
        if (quantity === 0) {
          this.cart.splice(
            this.cart.findIndex((item) => item === cartProduct),
            1
          );
        } else {
          cartProduct.quantity = quantity;
        }
      } else {
        const product = this.products.find((item) => item.id === productId);

        if (product) {
          this.cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            images: product.images,
          });
        }
      }
    });
  }
}
