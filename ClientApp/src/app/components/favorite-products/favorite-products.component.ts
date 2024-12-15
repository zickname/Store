import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartProduct } from 'src/app/models/cart-products';
import { FavoriteProduct } from '../../models/favorite-product';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Subscription } from 'rxjs';
import { ProductCard } from '../../models/product-card';
import { ProductDialogData } from '../../models/product-dialog-data';

@Component({
    selector: 'app-favorite-products',
    imports: [ProductCardComponent],
    templateUrl: './favorite-products.component.html'
})
export class FavoriteProductsComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly alertService = inject(AlertService);
  private readonly dialog = inject(MatDialog);

  private readonly cartProducts = signal<CartProduct[]>([]);
  public favoriteProducts = signal<FavoriteProduct[]>([]);
  public productsCard = computed<ProductCard[]>(() => {
    return this.favoriteProducts().map(product => {
      const cartItem = this.cartProducts().find(productCart => productCart.productId === product.id);

      return { ...product, quantity: cartItem ? cartItem.quantity : 0 };
    });
  });

  ngOnInit() {
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

  openModal(product: ProductCard) {
    this.dialog.open<ProductDetailsComponent, ProductDialogData>(ProductDetailsComponent, {
      width: '400px',
      restoreFocus: true,
      autoFocus: false,
      data: {
        product: product,
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
