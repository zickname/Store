import {HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from 'src/environments/environment.development';
import {OrderDto, OrderRequestDto} from '../models/order';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient);
  private readonly api_url: string = environment.apiUrl;

  createOrder(order: OrderRequestDto): Observable<OrderRequestDto> {
    return this.httpClient.post<OrderRequestDto>(`${this.api_url}/orders`, order);
  }

  getOrders(): Observable<OrderDto[]> {
    return this.httpClient.get<OrderDto[]>(`${this.api_url}/account/orders`, httpOptions).pipe(
      map(orders =>
        orders.map(order => ({
          ...order,
          createDate: new Date(order.createDate).toLocaleDateString(),
        }))
      )
    );
  }

  getOrder(id: number): Observable<OrderDto> {
    return this.httpClient.get<OrderDto>(`${this.api_url}/account/orders/${id}`).pipe(
      map(order => ({
        ...order,
        createDate: new Date(order.createDate).toLocaleDateString(),
      }))
    );
  }
}
