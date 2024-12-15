import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-profile-layout',
    template: '<router-outlet></router-outlet>',
    imports: [RouterOutlet]
})
export class ProfileLayoutComponent {
}
