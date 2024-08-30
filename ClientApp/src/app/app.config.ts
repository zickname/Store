import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {httpInterceptorProviders} from "./interceptors/http.interceptor";
import {DigitsCurrencyPipe} from "./pipes/digitsCurrency.pipe";
import {provideAnimations, provideNoopAnimations} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";

import {routes} from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    importProvidersFrom(
      BrowserModule,
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
      NgxMaskDirective,
      NgxMaskPipe
    ),
    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders,
    DigitsCurrencyPipe,
    provideNgxMask(),
    provideAnimations(),
    provideNoopAnimations(),
    provideRouter(routes)
  ],
}
