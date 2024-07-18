import { Component, inject, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-products';
import { FavoriteProducts } from 'src/app/models/favorite-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment.development';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);
  private dialog = inject(MatDialog);

  public readonly apiHost = environment.apiHost;

  @Input() public cartProducts: CartProduct[] = [];
  @Input() public favoriteProducts: FavoriteProducts[] = [];
  @Input() public isShowModal = false;
  @Input() public product: Product | null = null;

  public isActive = false;

  openModal(product: Product): void {
    if (this.isShowModal) {
      this.dialog.open(ProductDetailsComponent, {
        width: '400px',
        restoreFocus: true,
        autoFocus: false,
        data: {
          product: product,
          cartProducts: this.cartProducts,
        },
      });
    }
  }

  getQuantity(productId: number): number {
    const item = this.cartProducts.find(item => item.productId === productId);

    return item ? item.quantity : 0;
  }

  changeQuantity(productId: number, quantity: number) {
    if (quantity < 0) return;

    this.cartService.changeQuantity(productId, quantity).subscribe(() => {
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
    });
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some(fav => fav.productId === productId);
  }

  toggleFavorite(product: Product, $event: Event) {
    $event.stopPropagation();

    // const currentButton = $event.currentTarget as HTMLElement;

    if (this.isFavorite(product.id)) {
      this.subscriptions.add(
        this.favoritesService.removeFavoriteProduct(product.id).subscribe(() => {
          this.favoriteProducts = this.favoriteProducts.filter(fav => fav.productId !== product.id);
        })
      );
    } else {
      this.isActive = true;
      // currentButton.classList.add('active');
      this.favoritesService.addFavoriteProduct(product.id).subscribe(() => {
        this.favoriteProducts.push({ id: 0, productId: product.id });
        setTimeout(() => {
          // currentButton.classList.remove('active');
          this.isActive = false;
        }, 200);
      });
    }
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
