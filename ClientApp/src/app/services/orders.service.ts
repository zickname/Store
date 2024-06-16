import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Order } from '../models/order';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private api_url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.api_url}/orders/create`, { order });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api_url}/orders`, httpOptions);
  }

  getOrder(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api_url}/orders/${id}`);
  }
}
