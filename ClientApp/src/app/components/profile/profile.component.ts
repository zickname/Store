import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileInfo } from 'src/app/models/profile-info';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly subsciptions = new Subscription();
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  public profileInfo: ProfileInfo | null = null;

  ngOnInit() {
    this.subsciptions.add(this.authService.getProfileInfo().subscribe(data => (this.profileInfo = data)));
  }

  logout() {
    this.storageService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }
}
