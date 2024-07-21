import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  private readonly alertService = inject(AlertService);

  successMessage$ = this.alertService.errorMessage$.pipe(
    tap(message => {
      if (message) {
        setTimeout(() => this.alertService.clearAllMessages(), 5000);
        console.log(message);
      }
    })
  );
}
