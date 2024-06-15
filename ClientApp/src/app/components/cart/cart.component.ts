import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/models/cart/cart-products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  cartProductSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
    this.cartProductSubscription = this.cartService
      .getCart()
      .subscribe(
        (items: CartProduct[]): CartProduct[] => (this.cartProducts = items)
      );
  }

  changeQuantity(item: CartProduct, quantity: number): void {
    this.cartService.changeQuantity(item.productId, quantity).subscribe(() => {
      item.quantity = quantity;
    });
  }
}
