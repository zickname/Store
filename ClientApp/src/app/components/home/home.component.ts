import {Component} from '@angular/core';
import {ProductsComponent} from '../products/products.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [ProductsComponent],
})
export class BaseComponent {
}
