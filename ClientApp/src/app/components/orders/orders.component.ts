import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderDto } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: OrderDto[] = [];
  orderService: OrdersService = inject(OrdersService);

  ordersSubscription?: Subscription;

  ngOnInit() {
    this.ordersSubscription = this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    });
  }
}
