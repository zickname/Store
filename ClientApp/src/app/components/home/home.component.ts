import {Component} from '@angular/core';
import {ProductsComponent} from '../products/products.component';

@Component({
  selector: 'app-home',
  template: '<app-products></app-products>',
  standalone: true,
  imports: [ProductsComponent],
})
export class BaseComponent {
}
