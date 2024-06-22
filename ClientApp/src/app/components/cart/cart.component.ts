import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArrayHelper } from 'src/app/helpers/array.helper';
import { CartProduct } from 'src/app/models/cart-products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  cartProductSubscription?: Subscription;
  apiUrl = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
    this.apiUrl = environment.apiHost;
  }

  loadCart(): void {
    this.cartProductSubscription = this.cartService
      .getCart()
      .subscribe((items: CartProduct[]): CartProduct[] => (this.cartProducts = items));
  }

  getQuantity(productId: number): number {
    const item = this.cartProducts.find(item => item.productId === productId);

    return item ? item.quantity : 0;
  }

  getTotalAmount() {
    const sum = this.cartProducts.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    return sum;
  }

  changeQuantity(item: CartProduct, quantity: number): void {
    if (quantity < 0) return;

    this.cartService.changeQuantity(item.productId, quantity).subscribe(() => {
      if (quantity === 0) {
        ArrayHelper.remove(this.cartProducts, item);
      } else {
        item.quantity = quantity;
      }
    });
  }

  openModal() {
    throw new Error('Method not implemented.');
  }
}
