import {ChangeDetectorRef, Component} from '@angular/core';
import {RegistrationComponent} from '../../components/registration/registration.component';
import {LoginComponent} from '../../components/login/login.component';

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: ['./auth-dialog.component.css'],
    imports: [LoginComponent, RegistrationComponent]
})
export class AuthDialogComponent {
  public state: 'login' | 'register' = 'login';

  constructor(private cdr: ChangeDetectorRef) {
  }

  goToRegister() {
    this.state = 'register';
    this.cdr.detectChanges();
  }

  goToLogin() {
    this.state = 'login';
    this.cdr.detectChanges();
  }
}
