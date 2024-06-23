import { Component, inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new UntypedFormGroup({
    phoneNumber: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  authService = inject(AuthService);
  storageService = inject(StorageService);

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
    // console.log(this.form);
    const login = this.form.value;

    this.authService.login(login).subscribe({
      next: data => {
        this.storageService.saveUser(data.token);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage(): void {
    window.location.replace('/');
  }
}
