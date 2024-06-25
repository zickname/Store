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
  private readonly orderService: OrdersService = inject(OrdersService);

  public orders: OrderDto[] = [];

  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.orderService.getOrders().subscribe(data => {
        this.orders = data;
        console.log(this.orders);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
