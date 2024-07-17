import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);

  public form = new FormGroup({
    phoneNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn() ? true : false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const login = {
        phoneNumber: this.form.controls.phoneNumber.value,
        password: this.form.controls.password.value,
      };

      this.authService.login(login).subscribe(data => {
        this.storageService.saveUser(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.navigationByProfile();
      });
    }
  }

  navigationByProfile(): void {
    window.location.replace('/');
  }
}
