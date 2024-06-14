import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CartProducts } from 'src/app/models/cart/cart-products';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Products[] = [];
  cart: CartProducts[] = [];
  productsSubscription?: Subscription;
  cartSubscription?: Subscription;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
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

    const item = this.cart.find((item) => item.productId === productId);

    this.cartService.changeQuantity(productId, quantity).subscribe(() => {});
    
  }
}
