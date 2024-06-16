import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CartProduct } from '../models/cart-products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts: CartProduct[] = [];
  private _apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(`${this._apiUrl}/cart`);
  }

  changeQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this._apiUrl}/cart/change`, {
      productId,
      quantity,
    });
  }
}
