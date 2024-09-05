import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { DialogService } from '../../../feature/dialog/services/dialog.service';
import { NotFoundPageComponent } from '../../not-found-page/not-found-page.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatIcon, RouterLink, MatBadge, AsyncPipe, NgClass],
})
export class HeaderComponent {
  private readonly cartService = inject(CartService);
  private readonly favoriteService = inject(FavoritesService);
  private readonly dialogService = inject(DialogService);

  public cartProductsQuantity$ = toSignal(this.cartService.cartProductQuantity);
  public favoriteProductsQuantity$ = toSignal(this.favoriteService.favoriteProductsQuantity$);

  test() {
    this.dialogService
      .open(NotFoundPageComponent, { data: { test: 'data' }, showCloseButton: true })
      .onClose.subscribe(result => {
        console.log(result);
      });
  }

  protected readonly open = open;
}
