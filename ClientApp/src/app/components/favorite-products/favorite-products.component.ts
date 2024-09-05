import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartProduct } from 'src/app/models/cart-products';
import { FavoriteProduct } from '../../models/favorite-product';
import { Product } from 'src/app/models/products';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-products',
  imports: [ProductCardComponent],
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.css'],
  standalone: true,
})
export class FavoriteProductsComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly productService = inject(ProductsService);
  private readonly alertService = inject(AlertService);
  private readonly dialog = inject(MatDialog);

  protected products = signal<Product[]>([]);
  protected cartProducts = signal<CartProduct[]>([]);
  protected favoriteProducts = signal<FavoriteProduct[]>([]);

  ngOnInit() {
    this.subscription.add(
      this.productService.getProducts().subscribe((data: Product[]) => {
        this.products.set(data);
      }),

    );

    this.subscription.add(
      this.cartService.getCart().subscribe({
        next: data => {
          this.cartProducts.set(data);
        },
        error: () => {
          this.alertService.error('Произошла ошибка при запросе', { autoClose: true });
        },
      })
    );

    this.subscription.add(
      this.favoritesService.getFavoriteProducts().subscribe(data => {
        this.favoriteProducts.set(data);
      })
    );
  }

  openModal(product: Product): void {
    {
      this.dialog.open(ProductDetailsComponent, {
        width: '400px',
        restoreFocus: true,
        autoFocus: false,
        data: {
          product: product,
          cartProducts: this.cartProducts(),
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
