import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderDto } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  private readonly orderService = inject(OrdersService);
  private readonly route = inject(ActivatedRoute);

  public readonly apiHost = environment.apiHost;

  public order: OrderDto | null = null;

  subscriptions = new Subscription();

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('id');

      if (orderId) {
        this.subscriptions.add(
          this.orderService.getOrder(parseInt(orderId)).subscribe(data => {
            this.order = data;
          })
        );
      }
    });
  }

  // Спросить у ментора, имеет ли смысл првоерка subscriptions
  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
