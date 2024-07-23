import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class LoginDialogService {
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(LoginDialogComponent, {
      autoFocus: false,
    });
  }
}
