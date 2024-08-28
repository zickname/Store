import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteProductsComponent } from './components/favorite-products/favorite-products.component';
import { BaseComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { httpInterceptorProviders } from './interceptors/http.interceptor';
import { AuthDialogComponent } from './layouts/auth-layout/auth-dialog.component';
import { OrdersLayoutComponent } from './layouts/orders-layout/orders-layout.component';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';
import { DigitsCurrencyPipe } from './pipes/digitsCurrency.pipe';
import { DialogComponent } from './feature/dialog/components/dialog/dialog.component';
import { DialogDirective } from './feature/dialog/directives/dialog.directive';
import {DialogService} from "./feature/dialog/services/dialog.service";
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        OrdersComponent,
        OrderDetailsComponent,
        ProductsComponent,
        ProductDetailsComponent,
        CartComponent,
        BaseComponent,
        ProfileComponent,
        ProfileLayoutComponent,
        OrdersLayoutComponent,
        DigitsCurrencyPipe,
        RegistrationComponent,
        ProductCardComponent,
        AlertComponent,
        AuthDialogComponent,
        FavoriteProductsComponent,
        DialogComponent,
        NotFoundPageComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    DialogDirective
  ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        httpInterceptorProviders,
        DigitsCurrencyPipe,
        provideNgxMask(),
    ],
    bootstrap: [AppComponent],
    exports: [
    ]
})
export class AppModule {}
