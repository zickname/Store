import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CartProduct } from '../models/cart-products';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cartProducts = new BehaviorSubject<CartProduct[]>([]);
  private readonly authService = inject(AuthService);

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
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authService.openLoginDialog();
          }
          return of([]);
        })
      );
  }

  clearCart() {
    this.cartProducts.next([]);
    this.cartProductQuantity.next(0);
  }
}
