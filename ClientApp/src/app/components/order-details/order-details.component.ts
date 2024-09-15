import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderDto } from 'src/app/models/order';
import { environment } from 'src/environments/environment.development';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styles: '@tailwind utilities',
  standalone: true,
  imports: [AsyncPipe],
})
export class OrderDetailsComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  private readonly route = inject(ActivatedRoute);
  public readonly apiHost = environment.apiHost;

  public orderSig = signal<OrderDto | null>(null);

  constructor() {
    this.subscription.add(
      this.route.data.subscribe((data: { order: OrderDto } | Data) => {
        this.orderSig.set(data.order);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
