import {Component, inject, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthDialogComponent} from 'src/app/layouts/auth-layout/auth-dialog.component';
import {AuthService} from 'src/app/services/auth.service';
import {NgxMaskDirective} from 'ngx-mask';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
    ]
})
export class RegistrationComponent {
  private readonly authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<AuthDialogComponent>);

  protected switchToLogin = output();

  protected readonly form = new FormGroup({
    firstName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    phoneNumber: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  });

  onSubmit(): void {
    if (this.form.valid) {
      const registrationData = {
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
        phoneNumber: this.form.controls.phoneNumber.value,
        password: this.form.controls.password.value,
      };

      this.authService.register(registrationData).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
