import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment.development';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cartProducts: CartProduct[] = [];

  apiHost: string = environment.apiHost;
  productsSubscription?: Subscription;
  cartSubscription?: Subscription;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,

    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productsSubscription = this.productService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });

    this.cartSubscription = this.cartService.getCart().subscribe((data) => {
      this.cartProducts = data;
    });
  }

  ngOnDestroy() {
    this.productsSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }

  getQuantity(productId: number): number {
    const item = this.cartProducts.find((item) => item.productId === productId);

    return item ? item.quantity : 0;
  }

  changeQuantity(productId: number, quantity: number) {
    if (quantity < 0) return;

    this.cartService.changeQuantity(productId, quantity).subscribe(() => {
      const cartProduct = this.cartProducts.find(
        (item) => item.productId === productId
      );

      if (cartProduct) {
        if (quantity === 0) {
          this.cartProducts.splice(
            this.cartProducts.findIndex((item) => item === cartProduct),
            1
          );
        } else {
          cartProduct.quantity = quantity;
        }
      } else {
        const product = this.products.find((item) => item.id === productId);

        if (product) {
          this.cartProducts.push({
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

  openModal(product: Product): void {
    const dialogRef: MatDialogRef<ProductDetailsComponent> = this.dialog.open(
      ProductDetailsComponent,
      {
        width: '400px',
        data: {
          product: product,
          cartProducts: this.cartProducts,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      // unsubscribe onAdd
      console.log(result);
    });
  }
}
