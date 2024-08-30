import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {map, Observable} from 'rxjs';
import {OrderDto} from 'src/app/models/order';
import {environment} from 'src/environments/environment.development';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: true,
  imports: [AsyncPipe],
})
export class OrderDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  public readonly apiHost = environment.apiHost;
  public order$: Observable<OrderDto> | null = null;

  ngOnInit() {
    this.order$ = this.route.data.pipe(map((data: { order: OrderDto } | Data): OrderDto => data.order));
  }
}
