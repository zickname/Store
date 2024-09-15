import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileInfo } from 'src/app/models/profile-info';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  public profileInfo = signal<ProfileInfo | null>(null);

  ngOnInit() {
    this.subscription.add(this.authService.getProfileInfo().subscribe(data => (this.profileInfo.set(data))));
  }

  logout() {
    this.storageService.logout();
    this.router.navigate(['']).then(() => '');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
