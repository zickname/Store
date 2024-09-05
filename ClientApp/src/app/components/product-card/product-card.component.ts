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
import { CartProduct } from 'src/app/models/cart-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment.development';
import { FavoriteProduct } from '../../models/favorite-product';
import { DigitsCurrencyPipe } from '../../pipes/digitsCurrency.pipe';

@Component({
  standalone: true,
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
  ],
})
export class ProductCardComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);

  public readonly apiHost = environment.apiHost;

  public cartProducts = model.required<CartProduct[]>();
  public favoriteProducts = model.required<FavoriteProduct[]>();
  public product = input.required<Product>();
  public isActive = signal<boolean>(false);
  public isFavorite = computed<boolean>(() =>
    this.favoriteProducts().some(favoriteProduct => favoriteProduct.id === this.product().id)
  );
  public productQuantity = computed<number>(() => {
    const item = this.cartProducts().find(item => item.productId === this.product().id);
    console.log(this.cartProducts());
    return item ? item.quantity : 0;
  });

  changeQuantity(quantity: number) {
    if (quantity < 0 || !this.product()) return;

    const product = this.product();

    this.subscription.add(
      this.cartService.changeQuantity(product.id, quantity).subscribe(() => {
        const updatedCartProducts = this.cartProducts().some(item => item.productId === product.id)
          ? quantity === 0
            ? this.cartProducts().filter(item => item.productId !== product.id)
            : this.cartProducts().map(item =>
                item.productId === product.id
                  ? { ...item, quantity }
                  : item
              )
          : [
              ...this.cartProducts(),
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
                images: product.images,
              },
            ];

        this.cartProducts.set(updatedCartProducts);
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
