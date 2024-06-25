import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CartProduct } from '../models/cart-products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cartProducts = new BehaviorSubject<CartProduct[]>([]);

  public readonly cartProductQuantity = new Subject<number>();

  getCart(): Observable<CartProduct[]> {
    return this.httpClient.get<CartProduct[]>(`${environment.apiUrl}/cart`).pipe(
      map((data: CartProduct[]) => {
        this.cartProducts.next(data);
        this.cartProductQuantity.next(data.length);
        return data;
      })
    );
  }

  changeQuantity(productId: number, quantity: number): Observable<{ poductId: number; quantity: number }[]> {
    return this.httpClient
      .post<{ poductId: number; quantity: number }[]>(`${environment.apiUrl}/cart/change`, {
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

  clearCart() {
    this.cartProducts.next([]);
    this.cartProductQuantity.next(0);
  }
}
