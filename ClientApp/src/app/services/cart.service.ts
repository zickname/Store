import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CartProduct } from '../models/cart-products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProductQuantity = new Subject<number>();

  private _apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(`${this._apiUrl}/cart`).pipe(
      map((data: CartProduct[]) => {
        this.cartProductQuantity.next(data.length);
        return data;
      })
    );
  }

  changeQuantity(productId: number, quantity: number): Observable<{ poductId: number; quantity: number }[]> {
    return this.http
      .post<{ poductId: number; quantity: number }[]>(`${this._apiUrl}/cart/change`, {
        productId,
        quantity,
      })
      .pipe(
        map((response: { poductId: number; quantity: number }[]): { poductId: number; quantity: number }[] => {
          this.cartProductQuantity.next(response.length);
          return response;
        })
      );
  }
}
