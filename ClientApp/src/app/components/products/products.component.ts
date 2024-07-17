import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/models/cart-products';
import { FavoriteProducts } from 'src/app/models/favorite-products';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment.development';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly productService = inject(ProductsService);
  private dialog = inject(MatDialog);

  public readonly apiHost = environment.apiHost;

  public products: Product[] = [];
  public cartProducts: CartProduct[] = [];
  public favoriteProducts: FavoriteProducts[] = [];
  public isLoading = false;

  ngOnInit() {
    this.subscriptions.add(
      this.productService.getProducts().subscribe((data: Product[]) => {
        this.products = data;
      })
    );

    this.subscriptions.add(
      this.cartService.getCart().subscribe(data => {
        this.cartProducts = data;
      })
    );

    this.subscriptions.add(
      this.favoritesService.getFavoriteProducts().subscribe(data => {
        this.favoriteProducts = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openModal(product: Product): void {
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
        const product = this.products.find(item => item.id === productId);

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

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some(fav => fav.productId === productId);
  }

  toggleFavorite(product: Product, $event: Event) {
    $event.stopPropagation();

    const currentButton = $event.currentTarget as HTMLElement;

    if (this.isFavorite(product.id)) {
      this.subscriptions.add(
        this.favoritesService.removeFavoriteProduct(product.id).subscribe(() => {
          this.favoriteProducts = this.favoriteProducts.filter(fav => fav.productId !== product.id);
        })
      );
    } else {
      currentButton.classList.add('active');
      this.favoritesService.addFavoriteProduct(product.id).subscribe(() => {
        this.favoriteProducts.push({ id: 0, productId: product.id });
        setTimeout(() => {
          currentButton.classList.remove('active');
        }, 200);
      });
    }
  }
}
