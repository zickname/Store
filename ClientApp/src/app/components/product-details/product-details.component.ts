import { Component, inject, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.development';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [MatDialogClose, CurrencyPipe],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly data: { product: Product; cartProducts: CartProduct[]} = inject(MAT_DIALOG_DATA);
  public readonly apiUrl = environment.apiHost;

  public product = signal<Product | null>(null);
  public cartProducts = signal<CartProduct[]>([]);

  ngOnInit() {
    this.product.set(this.data.product);
    this.cartProducts.set(this.data.cartProducts);
  }

  changeQuantity(productId: number, quantity: number) {
    if (quantity < 0) return;

    this.subscription.add(
      this.cartService.changeQuantity(productId, quantity).subscribe(() => {
        const cartProduct = this.cartProducts().find(item => item.productId === productId);

        if (cartProduct) {
          quantity !== 0
            ? (cartProduct.quantity = quantity)
            : this.cartProducts().splice(
                this.cartProducts().findIndex(item => item === cartProduct),
                1
              );
        } else {
          const product = this.product();

          if (product) {
            this.cartProducts().push({
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: quantity,
              images: product.images,
            });
          }
        }
      })
    );
  }

  getQuantity(productId: number): number {
    const item = this.cartProducts().find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
