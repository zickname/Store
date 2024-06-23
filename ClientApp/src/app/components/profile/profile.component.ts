import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileInfo } from 'src/app/models/profile-info';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileInfo?: ProfileInfo;

  profileSubscription?: Subscription;

  authService = inject(AuthService);

  ngOnInit() {
    this.profileSubscription = this.authService.getProfileInfo().subscribe(data => (this.profileInfo = data));
  }
}
