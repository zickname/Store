import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderDto } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order!: OrderDto;

  orderService = inject(OrdersService);
  route = inject(ActivatedRoute);

  orderSubscription?: Subscription;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('id');
      if (orderId) {
        this.orderSubscription = this.orderService.getOrder(parseInt(orderId)).subscribe(data => {
          this.order = data;
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }
}
