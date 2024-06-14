import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';
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

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.url, httpOptions);
  }

  getProduct(id: number): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.url}/${id}`);
  }
}
