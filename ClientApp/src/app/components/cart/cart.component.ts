import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrayHelper } from 'src/app/helpers/array.helper';
import { CartProduct } from 'src/app/models/cart-products';
import { OrderRequestDto } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { environment } from 'src/environments/environment.development';
import { DigitsCurrencyPipe } from '../../pipes/digitsCurrency.pipe';
import { NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DigitsCurrencyPipe, NgOptimizedImage],
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  private readonly cartService: CartService = inject(CartService);
  private readonly orderService: OrdersService = inject(OrdersService);

  public readonly apiUrl = environment.apiHost;
  public readonly isLoading = signal<boolean>(false);
  public readonly showAddress = signal<boolean>(false);
  public readonly cartProducts = signal<CartProduct[]>([]);

  public form = new FormGroup({
    address: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit() {
    this.subscription.add(
      this.cartService.getCart().subscribe((items: CartProduct[]): void => {
        this.cartProducts.set(items);
        this.isLoading.set(true);
      })
    );
  }

  getTotalAmount(): number {
    return this.cartProducts().reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  }

  changeQuantity(item: CartProduct, quantity: number): void {
    if (quantity < 0) return;

    this.subscription.add(
      this.cartService.changeQuantity(item.productId, quantity).subscribe((): void => {
        if (quantity === 0) {
          ArrayHelper.remove(this.cartProducts(), item);
        } else {
          item.quantity = quantity;
        }
      })
    );
  }

  showInputAddress(): void {
    this.showAddress.set(true);
  }

  createOrder(): void {
    if (this.form.valid) {
      const order: OrderRequestDto = {
        address: this.form.controls.address.value,
        products: this.cartProducts().map(item => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      this.subscription.add(
        this.orderService.createOrder(order).subscribe((): void => {
          this.cartService.clearCart();
          this.cartProducts.set([]);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
