import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthDialogComponent} from 'src/app/layouts/auth-layout/auth-dialog.component';
import {AuthService} from 'src/app/services/auth.service';
import {StorageService} from 'src/app/services/storage.service';
import {NgxMaskDirective} from 'ngx-mask';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);
  private dialogRef = inject(MatDialogRef<AuthDialogComponent>);

  @Output() switchToRegister = new EventEmitter<void>();
  public form = new FormGroup({
    phoneNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  });
  public isLoginFailed = false;
  public errorMessage = '';

  onSubmit(): void {
    if (this.form.valid) {
      const login = {
        phoneNumber: this.form.controls.phoneNumber.value,
        password: this.form.controls.password.value,
      };

      this.authService.login(login).subscribe(data => {
        this.storageService.saveUser(data.token);
        this.isLoginFailed = false;
        this.dialogRef.close();
      });
    }
  }
}
