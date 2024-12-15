import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input, model, OnDestroy, signal } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment.development';
import { FavoriteProduct } from '../../models/favorite-product';
import { DigitsCurrencyPipe } from '../../pipes/digitsCurrency.pipe';
import { ProductCard } from '../../models/product-card';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardImage,
        NgClass,
        MatCardContent,
        MatCardSubtitle,
        MatCardActions,
        DigitsCurrencyPipe,
        NgOptimizedImage,
    ]
})
export class ProductCardComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);

  public readonly apiHost = environment.apiHost;

  public favoriteProducts = model.required<FavoriteProduct[]>();
  public product = input.required<ProductCard>();
  public isActive = signal<boolean>(false);
  public isFavorite = computed<boolean>(() =>
    this.favoriteProducts().some(favoriteProduct => favoriteProduct.id === this.product().id)
  );

  changeQuantity(quantity: number) {
    if (quantity < 0) return;

    const product = this.product();

    this.subscription.add(
      this.cartService.changeQuantity(product.id, quantity).subscribe(() => {
        this.product().quantity = quantity;
      })
    );
  }

  toggleFavorite(product: Product, $event: Event) {
    $event.stopPropagation();

    if (this.isFavorite()) {
      this.subscription.add(
        this.favoritesService.removeFavoriteProduct(product.id).subscribe(() => {
          const arr = this.favoriteProducts().filter(fav => fav.id !== product.id);

          this.favoriteProducts.set(arr);
        })
      );
    } else {
      this.subscription.add(
        this.favoritesService.addFavoriteProduct(product.id).subscribe(() => {
          this.favoriteProducts.set([...this.favoriteProducts(), this.product()]);
        })
      );
    }
    this.isActive.set(!this.isActive());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
