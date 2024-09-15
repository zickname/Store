import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthDialogComponent } from '../layouts/auth-layout/auth-dialog.component';
import { Login } from '../models/login';
import { ProfileInfo } from '../models/profile-info';
import { RegistrationRequest } from '../models/registrationRequest';
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly dialog = inject(MatDialog);

  login(login: Login): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(environment.apiUrl + '/account/authenticate', login);
  }

  register(registrationRequest: RegistrationRequest): Observable<object> {
    return this.httpClient.post(environment.apiUrl + '/accounts', {
      ...registrationRequest,
    });
  }

  openLoginDialog() {
    this.dialog.open(AuthDialogComponent, {
      autoFocus: false,
      closeOnNavigation: true,
    });
  }

  closeLoginDialog() {
    this.dialog.closeAll();
  }

  getProfileInfo(): Observable<ProfileInfo> {
    return this.httpClient.get<ProfileInfo>(environment.apiUrl + '/account');
  }
}
