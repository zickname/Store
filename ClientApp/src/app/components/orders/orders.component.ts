import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { OrderDto } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class OrdersComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  private readonly ordersService = inject(OrdersService);

  public ordersSig = signal<OrderDto[]>([]);

  constructor() {
    effect(() => {
      this.ordersSig().reverse();
    });

    this.subscription.add(
      this.ordersService.getOrders().subscribe(data => {
        this.ordersSig.set(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
