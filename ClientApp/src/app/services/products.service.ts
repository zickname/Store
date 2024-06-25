import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/products';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  private readonly api_url: string = environment.apiUrl;

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.api_url}/products`, httpOptions);
  }

  getProduct(id: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.api_url}/products/${id}`);
  }
}
