import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

const AUTH_API = 'http://localhost:5025/api/account/authenticate'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(phoneNumber: number, password: string): Observable<any> {
        return this.http.post(
            AUTH_API,
            {
                phoneNumber,
                password,
            },
            httpOptions
        )
    }

    register(firstName: string, lastName: string, phoneNumber: number, password: string): Observable<any> {
        return this.http.post(
            AUTH_API,
            {
                firstName,
                lastName,
                phoneNumber,
                password,
            },
            httpOptions
        )
    }

    logout(): Observable<any> {
        return this.http.post(AUTH_API, {}, httpOptions)
    }
}
