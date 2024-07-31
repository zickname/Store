import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FavoriteProducts } from '../models/favorite-products';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly api_url: string = environment.apiUrl;

  getFavoriteProducts(): Observable<FavoriteProducts[]> {
    return this.httpClient.get<FavoriteProducts[]>(`${this.api_url}/favorite-products`);
  }

  addFavoriteProduct(id: number): Observable<FavoriteProducts[]> {
    return this.httpClient.post<FavoriteProducts[]>(`${this.api_url}/favorite-products/add`, { id }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authService.openLoginDialog();
          }
        },
      })
    );
  }

  removeFavoriteProduct(id: number): Observable<FavoriteProducts[]> {
    return this.httpClient.post<FavoriteProducts[]>(`${this.api_url}/favorite-products/remove`, { id }).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authService.openLoginDialog();
          }
        },
      })
    );
  }
}
