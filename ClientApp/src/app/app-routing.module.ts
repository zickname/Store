import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { BaseComponent } from './components/home/home.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ordersResolver } from './components/resolvers/orders.resolve';
import { authGuard } from './guards/auth.guard';
import { OrdersLayoutComponent } from './layouts/orders-layout/orders-layout.component';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';

const routerOptions: ExtraOptions = {
  // enableViewTransitions: true,
  // enableTracing: true,
};

const routes: Routes = [
  { path: '', component: BaseComponent, pathMatch: 'full' },

  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },

  {
    path: 'profile',
    component: ProfileLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: ProfileComponent },
      {
        path: 'orders',
        component: OrdersLayoutComponent,
        children: [
          { path: '', component: OrdersComponent },
          { path: ':id', component: OrderDetailsComponent, resolve: { order: ordersResolver } },
        ],
      },
    ],
  },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
