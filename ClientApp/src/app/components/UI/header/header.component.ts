import { Component, inject, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private readonly cartService = inject(CartService);

  public cartProductsQuantity: number | null = null;

  ngOnInit() {
    this.cartService.cartProductQuantity.subscribe(data => {
      this.cartProductsQuantity = data;
    });
  }
}
