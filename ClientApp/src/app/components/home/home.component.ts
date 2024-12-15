import {Component} from '@angular/core';
import {ProductsComponent} from '../products/products.component';

@Component({
    selector: 'app-home',
    template: '<app-products></app-products>',
    imports: [ProductsComponent]
})
export class BaseComponent {
}
