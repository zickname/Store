import { Component, OnInit } from '@angular/core'
import { CartProduct } from 'src/app/models/cart-products'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  cartProducts: CartProduct[] = []

  constructor() { }

  ngOnInit() {
  }

}
