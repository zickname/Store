import { Component, inject, Input, OnDestroy } from '@angular/core';
import { delay, of, Subscription, tap } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-products';
import { FavoriteProducts } from 'src/app/models/favorite-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
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
      this.cartService
        .changeQuantity(productId, quantity)
        .pipe(
          tap(response => {
            if (response.length === 0) {
              return;
            }

            const cartProduct = this.cartProducts.find(item => item.productId === productId);

            if (cartProduct) {
              if (quantity === 0) {
                this.cartProducts.splice(
                  this.cartProducts.findIndex(item => item === cartProduct),
                  1
                );
              } else {
                cartProduct.quantity = quantity;
              }
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
        )
        .subscribe()
    );
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some(fav => fav.productId === productId);
  }

  toggleFavorite(product: Product, $event: Event) {
    $event.stopPropagation();

    if (this.isFavorite(product.id)) {
      this.subscriptions.add(
        this.favoritesService.removeFavoriteProduct(product.id).subscribe(() => {
          this.favoriteProducts = this.favoriteProducts.filter(fav => fav.productId !== product.id);
        })
      );
    } else {
      this.subscriptions.add(
        this.favoritesService
          .addFavoriteProduct(product.id)
          .pipe(
            tap(() => {
              this.isActive = true;
              this.favoriteProducts.push({ id: 0, productId: product.id });
              return of(true).pipe(delay(200));
            })
          )
          .subscribe()
      );
    }
    this.isActive = false;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
