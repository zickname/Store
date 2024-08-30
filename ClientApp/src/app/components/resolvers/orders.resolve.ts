import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {OrderDto} from 'src/app/models/order';
import {OrdersService} from 'src/app/services/orders.service';

export const ordersResolver: ResolveFn<OrderDto> = route => {
  {
    const orderService = inject(OrdersService);

    return orderService.getOrder(route.params['id']);
  }
};
