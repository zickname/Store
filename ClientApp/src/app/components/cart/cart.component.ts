import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArrayHelper } from 'src/app/helpers/array.helper';
import { CartProduct } from 'src/app/models/cart-products';
import { OrderRequestDto } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly cartService: CartService = inject(CartService);
  private readonly orderService: OrdersService = inject(OrdersService);

  public readonly apiUrl = environment.apiHost;
  public showAddress = false;
  public cartProducts: CartProduct[] = [];
  public isLoading = true;

  public form = new UntypedFormGroup({
    address: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit() {
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadCart(): void {
    this.subscriptions.add(
      this.cartService.getCart().subscribe((items: CartProduct[]) => {
        this.cartProducts = items;
        this.isLoading = false;
      })
    );
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

  showInputAddress(): void {
    this.showAddress = true;
  }

  createOrder() {
    if (this.form.valid) {
      const order: OrderRequestDto = {
        address: this.form.value.address,
        products: this.cartProducts.map(item => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      this.orderService.createOrder(order).subscribe(() => {
        this.cartService.clearCart();
        this.cartProducts = [];
      });
    }
  }
}
