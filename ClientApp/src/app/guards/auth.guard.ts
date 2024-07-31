import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const authService = inject(AuthService);

  if (storageService.isLoggedIn()) {
    return true;
  } else {
    authService.openLoginDialog();
    return false;
  }
};
