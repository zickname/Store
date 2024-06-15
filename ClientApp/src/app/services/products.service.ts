import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'http://localhost:5025/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, httpOptions);
  }

  getProduct(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${id}`);
  }
}
