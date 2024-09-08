import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.development';
import { CurrencyPipe } from '@angular/common';
import { ProductDialogData } from '../../models/product-dialog-data';
import {ProductCard} from "../../models/product-card";

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
  private readonly dataDialog: ProductDialogData = inject(MAT_DIALOG_DATA);
  public readonly apiUrl = environment.apiHost;

  public product = signal<ProductCard | null>(null);

  ngOnInit() {
    this.product.set(this.dataDialog.product);
  }

  changeQuantity(quantity: number) {
    const product = this.product();

    if (quantity < 0 || !product) return;

    this.subscription.add(
      this.cartService.changeQuantity(product.id, quantity).subscribe(() => {
        product.quantity = quantity;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
