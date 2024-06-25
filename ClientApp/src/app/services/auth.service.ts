import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Login } from '../models/login';
import { ProfileInfo } from '../models/profile-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);

  login(login: Login): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(environment.apiUrl + '/account/authenticate', login);
  }

  register(firstName: string, lastName: string, phoneNumber: number, password: string): Observable<object> {
    return this.httpClient.post(environment.apiUrl + 'registration', {
      firstName,
      lastName,
      phoneNumber,
      password,
    });
  }

  // TODO: Сделать выход с аккаунта
  // logout(): Observable<object> {
  //   return this.http.post(environment.apiUrl + 'login', {}, this.httpOptions);
  // }

  getProfileInfo(): Observable<ProfileInfo> {
    return this.httpClient.get<ProfileInfo>(environment.apiUrl + '/account');
  }
}
