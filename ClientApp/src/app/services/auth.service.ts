import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  login(phoneNumber: number, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      environment.apiUrl + 'login',
      {
        phoneNumber,
        password,
      },
      this.httpOptions
    );
  }

  register(firstName: string, lastName: string, phoneNumber: number, password: string): Observable<object> {
    return this.http.post(
      environment.apiUrl + 'registration',
      {
        firstName,
        lastName,
        phoneNumber,
        password,
      },
      this.httpOptions
    );
  }

  logout(): Observable<object> {
    return this.http.post(environment.apiUrl + 'login', {}, this.httpOptions);
  }
}
