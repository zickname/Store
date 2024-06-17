import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { StorageService } from 'src/app/services/storage.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    form: any = {
        phoneNumber: null,
        password: null,
    }
    isLoggedIn = false
    isLoginFailed = false
    errorMessage = ''

    constructor(
        private authService: AuthService,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true
        }
    }

    onSubmit(): void {
        const { phoneNumber, password } = this.form

        this.authService.login(phoneNumber, password).subscribe({
            next: (data) => {
                this.storageService.saveUser(data.token)

                this.isLoginFailed = false
                this.isLoggedIn = true
                this.reloadPage()
            },
            error: (err) => {
                this.errorMessage = err.error.message
                this.isLoginFailed = true
            },
        })
    }

    reloadPage(): void {
        window.location.replace('/')
    }
}
