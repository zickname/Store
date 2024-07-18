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
}
