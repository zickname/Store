import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.compoment.html',
  styleUrls: ['./auth-dialog.component.css'],
  // animations: [slideInAnimation],
})
export class AuthDialogComponent {
  public state: 'login' | 'register' = 'login';

  constructor(private cdr: ChangeDetectorRef) {}

  goToRegister() {
    this.state = 'register';
    this.cdr.detectChanges();
  }

  goToLogin() {
    this.state = 'login';
    this.cdr.detectChanges();
  }
}
