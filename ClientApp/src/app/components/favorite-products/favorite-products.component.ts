import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {catchError, of, Subscription, tap} from 'rxjs';
import {CartProduct} from 'src/app/models/cart-products';
import {FavoriteProducts} from 'src/app/models/favorite-products';
import {Product} from 'src/app/models/products';
import {AlertService} from 'src/app/services/alert.service';
import {CartService} from 'src/app/services/cart.service';
import {FavoritesService} from 'src/app/services/favorites.service';
import {ProductsService} from 'src/app/services/products.service';
import {environment} from 'src/environments/environment.development';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {ProductCardComponent} from '../product-card/product-card.component';

@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.css'],
  standalone: true,
  imports: [ProductCardComponent],
})
export class FavoriteProductsComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly cartService = inject(CartService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly productService = inject(ProductsService);
  private readonly alertService = inject(AlertService);
  private readonly dialog = inject(MatDialog);

  public readonly apiHost = environment.apiHost;

  products: Product[] = [];
  cartProducts: CartProduct[] = [];
  favoriteProducts: FavoriteProducts[] = [];

  ngOnInit() {
    this.subscriptions.add(
      this.productService.getProducts().subscribe((data: Product[]) => {
        this.products = data;
      })
    );

    this.subscriptions.add(
      this.cartService
        .getCart()
        .subscribe({
            next: (data) => {
              this.cartProducts = data;
            },
            error: () => {
              this.alertService.error('Произошла ошибка при запросе', {autoClose: true});
            }
          }
        )
    );

    this.subscriptions.add(
      this.favoritesService.getFavoriteProducts().subscribe(data => {
        this.favoriteProducts = data;
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
          cartProducts: this.cartProducts,
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
