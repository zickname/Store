import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProducts } from '../models/cart/cart-products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _host: string = 'http://localhost:5025/api';
  private _apiUrl: string = 'http://localhost:3000/cartItem'; //this._host + '/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartProducts[]> {
    return this.http.get<CartProducts[]>(`${this._host}/cart`);
  }

  changeQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this._host}/cart/change`, {
      productId,
      quantity,
    });
  }
}
