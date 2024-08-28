import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import {DialogService} from "../../../feature/dialog/services/dialog.service";
import {
  NotFoundPageComponent
} from "../../not-found-page/not-found-page.component";
import {CartComponent} from "../../cart/cart.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly favoriteService = inject(FavoritesService);

  private readonly dialogService = inject(DialogService)
  private readonly matDialog = inject(MatDialog)

  public cartProductsQuantity$: Observable<number> | null = null;
  public favoriteProductsQuantity$: Observable<number> | null = null;

  ngOnInit() {
    this.cartProductsQuantity$ = this.cartService.cartProductQuantity;
    this.favoriteProductsQuantity$ = this.favoriteService.favoriteProductsQuantity$;
  }

  test() {
    this.dialogService.open(NotFoundPageComponent, {data: {test:"data"}})}
}
