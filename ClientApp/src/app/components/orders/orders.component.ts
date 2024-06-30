import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderDto } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();
  private readonly ordersService = inject(OrdersService);

  public orders: OrderDto[] = [];

  ngOnInit() {
    this.subscriptions.add(
      this.ordersService.getOrders().subscribe(data => {
        this.orders = data;
        console.log(this.orders);
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
