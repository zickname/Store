import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly successMessage = new Subject<string>();
  private readonly errorMessage = new Subject<string>();

  public readonly errorMessage$ = this.errorMessage.asObservable();
  public readonly successMessage$ = this.successMessage.asObservable();

  setSuccessMessage(message: string) {
    this.successMessage.next(message);
  }

  setErrorMessage(message: string) {
    this.errorMessage.next(message);
  }

  clearSuccessMessage() {
    this.setSuccessMessage('');
  }

  clearErrorMessage() {
    this.setErrorMessage('');
  }

  clearAllMessages() {
    this.clearSuccessMessage();
    this.clearErrorMessage();
  }
}
