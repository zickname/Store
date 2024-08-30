import {Component, inject, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CartService} from 'src/app/services/cart.service';
import {FavoritesService} from 'src/app/services/favorites.service';
import {DialogService} from "../../../feature/dialog/services/dialog.service";
import {
  NotFoundPageComponent
} from "../../not-found-page/not-found-page.component";
import {CartComponent} from "../../cart/cart.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AsyncPipe} from '@angular/common';
import {MatBadge} from '@angular/material/badge';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    RouterLink,
    MatBadge,
    AsyncPipe,
  ],
})
export class HeaderComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly favoriteService = inject(FavoritesService);
  private readonly dialogService = inject(DialogService)

  public cartProductsQuantity$: Observable<number> | null = null;
  public favoriteProductsQuantity$: Observable<number> | null = null;

  ngOnInit() {
    this.cartProductsQuantity$ = this.cartService.cartProductQuantity;
    this.favoriteProductsQuantity$ = this.favoriteService.favoriteProductsQuantity$;
  }

  test() {
    this.dialogService.open(NotFoundPageComponent, {data: {test: "data"}}).onClose.subscribe((result) => {
      console.log(result)
    })
  }
}
