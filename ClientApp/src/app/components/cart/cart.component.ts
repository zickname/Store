import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartProducts } from 'src/app/models/cart/cart-products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: CartProducts[] = []
  cartProductSubscription?: Subscription

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
    this.cartProductSubscription = this.cartService
    .getCart().subscribe((items: CartProducts[]): CartProducts[] => this.cartProducts = items);
  }

  changeQuantity(item: CartProducts, quantity: number): void {
    this.cartService.changeQuantity(item.productId, quantity).subscribe(
      () => {
        item.quantity = quantity;
      }
    );
  }

}
