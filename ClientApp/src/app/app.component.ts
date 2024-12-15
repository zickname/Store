import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { HeaderComponent } from './components/UI/header/header.component';
import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent, AlertComponent, RouterOutlet, FooterComponent, TuiRoot, TuiRoot, TuiRoot, TuiRoot, TuiRoot]
})
export class AppComponent {
  title = 'ClientApp';
}
