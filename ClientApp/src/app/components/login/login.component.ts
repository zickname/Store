import {Component, inject, OnDestroy, output} from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from 'src/app/layouts/auth-layout/auth-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgxMaskDirective } from 'ngx-mask';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: '@tailwind utilities;',
    imports: [FormsModule, ReactiveFormsModule, NgxMaskDirective]
})
export class LoginComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly storageService = inject(StorageService);
  private readonly dialogRef = inject(MatDialogRef<AuthDialogComponent>);

  protected switchToRegister = output();

  public form = new FormGroup({
    phoneNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });
  public isLoginFailed = false;

  onSubmit(): void {
    if (this.form.valid) {
      const login = {
        phoneNumber: this.form.controls.phoneNumber.value,
        password: this.form.controls.password.value,
      };

      this.subscription.add(
        this.authService.login(login).subscribe({
          next: data => {
            this.storageService.saveUser(data.token);
            this.isLoginFailed = false;
            this.dialogRef.close();
          },
          error: (e: HttpErrorResponse) => {
            this.alertService.error(e.error, { autoClose: true });
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
