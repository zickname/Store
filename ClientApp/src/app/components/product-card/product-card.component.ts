import { Component, inject, Input, OnDestroy } from '@angular/core';
import { delay, of, Subscription, tap } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-products';
import { FavoriteProducts } from 'src/app/models/favorite-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment.development';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { CurrencyPipe, NgClass } from '@angular/common';
import { DigitsCurrencyPipe } from '../../pipes/digitsCurrency.pipe';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  standalone: true,
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
  ],
})
export class ProductCardComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);

  public readonly apiHost = environment.apiHost;

  @Input() public cartProducts: CartProduct[] = [];
  @Input() public favoriteProducts: FavoriteProducts[] = [];
  @Input() public product: Product | null = null;

  public isActive = false;

  getQuantity(productId: number): number {
    const item = this.cartProducts.find(item => item.productId === productId);

    return item ? item.quantity : 0;
  }

  changeQuantity(productId: number, quantity: number) {
    if (quantity < 0) return;

    this.subscriptions.add(
      this.cartService.changeQuantity(productId, quantity).subscribe(response => {
        const cartProduct = this.cartProducts.find(item => item.productId === productId);

        if (cartProduct) {
          quantity !== 0
            ? (cartProduct.quantity = quantity)
            : this.cartProducts.splice(
                this.cartProducts.findIndex(item => item === cartProduct),
                1
              );
        } else {
          if (this.product) {
            this.cartProducts.push({
              productId: this.product.id,
              name: this.product.name,
              price: this.product.price,
              quantity: quantity,
              images: this.product.images,
            });
          }
        }
      })
    );
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some(fav => fav.id === productId);
  }

  toggleFavorite(product: Product, $event: Event) {
    $event.stopPropagation();

    if (this.isFavorite(product.id)) {
      this.subscriptions.add(
        this.favoritesService.removeFavoriteProduct(product.id).subscribe(() => {
          this.favoriteProducts = this.favoriteProducts.filter(fav => fav.id !== product.id);
        })
      );
    } else {
      this.subscriptions.add(
        this.favoritesService.addFavoriteProduct(product.id).subscribe(() => {
          this.isActive = true;
          this.favoriteProducts.push(product);
        })
      );
    }
    this.isActive = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
