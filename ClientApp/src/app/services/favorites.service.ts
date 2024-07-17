import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FavoriteProducts } from '../models/favorite-products';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly httpClient = inject(HttpClient);
  private readonly api_url: string = environment.apiUrl;

  getFavoriteProducts(): Observable<FavoriteProducts[]> {
    return this.httpClient.get<FavoriteProducts[]>(`${this.api_url}/favorite-products`);
  }

  addFavoriteProduct(id: number): Observable<FavoriteProducts[]> {
    return this.httpClient.post<FavoriteProducts[]>(`${this.api_url}/add-item-favorites`, { id });
  }

  removeFavoriteProduct(id: number): Observable<FavoriteProducts[]> {
    return this.httpClient.post<FavoriteProducts[]>(`${this.api_url}/remove-item-favorites`, { id });
  }
}
