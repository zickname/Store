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
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);

  public form = new UntypedFormGroup({
    phoneNumber: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn() ? true : false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const login = this.form.value;

      this.authService.login(login).subscribe(
        data => {
          this.storageService.saveUser(data.token);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
  // console.log(this.form);

  reloadPage(): void {
    window.location.replace('/');
  }
}
